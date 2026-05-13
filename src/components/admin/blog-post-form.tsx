/* eslint-disable @next/next/no-img-element */
"use client";

import { useMemo, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { AdminConfirmModal } from "@/components/admin/admin-confirm-modal";
import { blogStatusOptions, formatDate, getStatusLabel, slugify } from "@/lib/admin-utils";
import {
  createBlogPost,
  deleteBlogPost,
  updateBlogPost,
  type BlogPostInput,
} from "@/lib/actions/admin/blog";
import type { BlogPost } from "@/lib/types/database";
import { useToast } from "@/components/admin/toast";

type BlogPostFormProps = {
  post?: BlogPost | null;
};

const categoryOptions = [
  "CSS/PMS Prep",
  "Career Guidance",
  "Admissions",
  "Writing Tips",
  "Events",
  "General",
];

export function BlogPostForm({ post }: BlogPostFormProps) {
  const router = useRouter();
  const { showToast } = useToast();
  const [isPending, startTransition] = useTransition();
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [slugEdited, setSlugEdited] = useState(Boolean(post?.slug));
  const [form, setForm] = useState<BlogPostInput>({
    body: post?.body ?? "",
    category: post?.category ?? categoryOptions[0],
    excerpt: post?.excerpt ?? "",
    featured: post?.featured ?? false,
    featuredImageUrl: post?.featuredImageUrl ?? "",
    publishedAt: post?.publishedAt ? toDateInput(post.publishedAt) : toDateInput(new Date()),
    slug: post?.slug ?? "",
    status: post?.status ?? "DRAFT",
    title: post?.title ?? "",
  });

  const previewUrl = useMemo(() => {
    try {
      return form.featuredImageUrl ? new URL(form.featuredImageUrl).toString() : "";
    } catch {
      return "";
    }
  }, [form.featuredImageUrl]);

  const savePost = () => {
    startTransition(async () => {
      const result = post
        ? await updateBlogPost(post.id, form)
        : await createBlogPost(form);

      if (!result.success) {
        showToast(result.error, "error");
        return;
      }

      showToast(post ? "Blog post updated." : "Blog post created.", "success");
      router.push("/admin/blog");
      router.refresh();
    });
  };

  const removePost = () => {
    if (!post) {
      return;
    }

    startTransition(async () => {
      const result = await deleteBlogPost(post.id);

      if (!result.success) {
        showToast(result.error, "error");
        return;
      }

      showToast("Blog post deleted.", "success");
      router.push("/admin/blog");
      router.refresh();
    });
  };

  return (
    <>
      <div className="admin-card p-6">
        <div className="grid gap-5">
          <Field label="Title">
            <input
              className="admin-input"
              value={form.title}
              onChange={(event) => {
                const title = event.target.value;
                setForm((current) => ({
                  ...current,
                  slug: slugEdited ? current.slug : slugify(title),
                  title,
                }));
              }}
            />
          </Field>

          <Field label="Slug" note={`This becomes the URL: /blog/${form.slug || "[slug]"}`}>
            <input
              className="admin-input"
              value={form.slug}
              onChange={(event) => {
                setSlugEdited(true);
                setForm((current) => ({ ...current, slug: slugify(event.target.value) }));
              }}
            />
          </Field>

          <Field label="Category">
            <select
              className="admin-select"
              value={form.category}
              onChange={(event) => setForm((current) => ({ ...current, category: event.target.value }))}
            >
              {categoryOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </Field>

          <Field label="Excerpt">
            <textarea
              className="admin-textarea"
              rows={3}
              value={form.excerpt}
              onChange={(event) => setForm((current) => ({ ...current, excerpt: event.target.value }))}
            />
          </Field>

          <Field label="Body">
            <textarea
              className="admin-textarea font-mono"
              rows={16}
              value={form.body}
              onChange={(event) => setForm((current) => ({ ...current, body: event.target.value }))}
            />
          </Field>

          <Field label="Featured Image URL">
            <input
              className="admin-input"
              value={form.featuredImageUrl}
              onChange={(event) =>
                setForm((current) => ({ ...current, featuredImageUrl: event.target.value }))
              }
            />
            {previewUrl ? (
              <img
                src={previewUrl}
                alt="Featured preview"
                className="mt-3 h-48 w-full rounded-[12px] object-cover"
              />
            ) : null}
          </Field>

          <Field label="Status">
            <div className="admin-segmented">
              {blogStatusOptions.map((option) => (
                <button
                  key={option}
                  type="button"
                  data-active={form.status === option}
                  onClick={() => setForm((current) => ({ ...current, status: option }))}
                >
                  {getStatusLabel(option)}
                </button>
              ))}
            </div>
          </Field>

          {form.status === "PUBLISHED" ? (
            <Field label="Published Date">
              <input
                className="admin-input"
                type="date"
                value={form.publishedAt}
                onChange={(event) =>
                  setForm((current) => ({ ...current, publishedAt: event.target.value }))
                }
              />
            </Field>
          ) : null}

          <label className="flex items-center gap-3 text-sm font-medium text-[#1F2937]">
            <input
              type="checkbox"
              checked={form.featured}
              onChange={(event) =>
                setForm((current) => ({ ...current, featured: event.target.checked }))
              }
            />
            <span>Mark as featured post</span>
          </label>

          <div className="flex flex-wrap justify-between gap-3 border-t border-[#EEEEEE] pt-5">
            <div className="text-sm text-[#6B7280]">
              {post ? `Last saved ${formatDate(post.updatedAt)}` : "Create a new editorial entry."}
            </div>
            <div className="flex flex-wrap gap-3">
              {post ? (
                <button
                  type="button"
                  className="admin-button-danger"
                  onClick={() => setShowDeleteConfirm(true)}
                >
                  Delete
                </button>
              ) : null}
              <button
                type="button"
                disabled={isPending}
                className="admin-button-primary"
                onClick={savePost}
              >
                {isPending ? "Saving..." : "Save"}
              </button>
            </div>
          </div>
        </div>
      </div>

      <AdminConfirmModal
        open={showDeleteConfirm}
        onClose={() => setShowDeleteConfirm(false)}
        onConfirm={removePost}
        message="This post will be removed from both the admin portal and the public blog."
        title="Delete Blog Post"
      />
    </>
  );
}

function Field({
  children,
  label,
  note,
}: {
  children: React.ReactNode;
  label: string;
  note?: string;
}) {
  return (
    <label className="block space-y-2 text-sm font-medium text-[#1F2937]">
      <span>{label}</span>
      {children}
      {note ? <span className="block text-xs text-[#6B7280]">{note}</span> : null}
    </label>
  );
}

function toDateInput(value: string | Date) {
  const date = value instanceof Date ? value : new Date(value);
  return date.toISOString().slice(0, 10);
}
