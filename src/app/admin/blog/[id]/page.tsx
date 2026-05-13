import { notFound } from "next/navigation";
import { BlogPostForm } from "@/components/admin/blog-post-form";
import prisma from "@/lib/prisma";

type Props = {
  params: Promise<{ id: string }>;
};

export default async function AdminBlogEditPage({ params }: Props) {
  const { id } = await params;
  const post = await prisma.blogPost.findUnique({ where: { id } });

  if (!post) {
    notFound();
  }

  return <BlogPostForm post={post} />;
}
