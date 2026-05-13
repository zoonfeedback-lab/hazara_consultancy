"use server";

import { revalidatePath } from "next/cache";
import type { BlogPost, BlogPostStatus } from "@/lib/types/database";
import { slugify, toNullableString, toOptionalDate } from "@/lib/admin-utils";
import prisma from "@/lib/prisma";
import { adminActionError, type AdminActionResult } from "@/lib/actions/admin/result";

export type BlogPostInput = {
  body: string;
  category: string;
  excerpt: string;
  featured: boolean;
  featuredImageUrl: string;
  publishedAt: string;
  slug: string;
  status: BlogPostStatus;
  title: string;
};

function toBlogPostData(input: BlogPostInput) {
  const slug = slugify(input.slug || input.title);
  const publishedAt = input.status === "PUBLISHED" ? toOptionalDate(input.publishedAt) ?? new Date() : null;

  return {
    body: toNullableString(input.body),
    category: toNullableString(input.category),
    excerpt: toNullableString(input.excerpt),
    featured: input.featured,
    featuredImageUrl: toNullableString(input.featuredImageUrl),
    publishedAt,
    slug,
    status: input.status,
    title: input.title.trim(),
  };
}

function revalidateBlogPaths(slug?: string) {
  revalidatePath("/admin/dashboard");
  revalidatePath("/admin/blog");
  revalidatePath("/blog");

  if (slug) {
    revalidatePath(`/blog/${slug}`);
  }
}

export async function createBlogPost(input: BlogPostInput): Promise<AdminActionResult<BlogPost>> {
  try {
    const post = await prisma.blogPost.create({
      data: toBlogPostData(input),
    });

    revalidateBlogPaths(post.slug);
    return { data: post, success: true };
  } catch (error) {
    return adminActionError(error, "Unable to create blog post.");
  }
}

export async function updateBlogPost(
  id: string,
  input: BlogPostInput,
): Promise<AdminActionResult<BlogPost>> {
  try {
    const post = await prisma.blogPost.update({
      data: toBlogPostData(input),
      where: { id },
    });

    revalidateBlogPaths(post.slug);
    return { data: post, success: true };
  } catch (error) {
    return adminActionError(error, "Unable to update blog post.");
  }
}

export async function deleteBlogPost(id: string): Promise<AdminActionResult<{ id: string }>> {
  try {
    const post = await prisma.blogPost.delete({ where: { id } });
    revalidateBlogPaths(post.slug);
    return { data: { id: post.id }, success: true };
  } catch (error) {
    return adminActionError(error, "Unable to delete blog post.");
  }
}

export async function toggleBlogFeatured(
  id: string,
  featured: boolean,
): Promise<AdminActionResult<{ id: string; featured: boolean }>> {
  try {
    const post = await prisma.blogPost.update({
      data: { featured },
      where: { id },
    });

    revalidateBlogPaths(post.slug);
    return { data: { featured: post.featured, id: post.id }, success: true };
  } catch (error) {
    return adminActionError(error, "Unable to update featured state.");
  }
}
