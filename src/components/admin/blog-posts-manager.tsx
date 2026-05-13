"use client";

import Link from "next/link";
import { useState, useTransition } from "react";
import { AdminBadge } from "@/components/admin/admin-badge";
import { AdminConfirmModal } from "@/components/admin/admin-confirm-modal";
import { AdminTable } from "@/components/admin/admin-table";
import { AdminToggle } from "@/components/admin/admin-toggle";
import { useToast } from "@/components/admin/toast";
import { deleteBlogPost, toggleBlogFeatured } from "@/lib/actions/admin/blog";
import { formatDate } from "@/lib/admin-utils";
import type { BlogPost } from "@/lib/types/database";

type BlogPostRecord = Omit<BlogPost, "createdAt" | "publishedAt" | "updatedAt"> & {
  createdAt: string;
  publishedAt: string | null;
  updatedAt: string;
};

export function BlogPostsManager({ posts }: { posts: BlogPostRecord[] }) {
  const { showToast } = useToast();
  const [rows, setRows] = useState(posts);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const remove = (id: string) => {
    startTransition(async () => {
      const result = await deleteBlogPost(id);

      if (!result.success) {
        showToast(result.error, "error");
        return;
      }

      setRows((current) => current.filter((row) => row.id !== id));
      setSelectedId(null);
      showToast("Blog post deleted.", "success");
    });
  };

  const toggleFeatured = (id: string, featured: boolean) => {
    startTransition(async () => {
      const result = await toggleBlogFeatured(id, featured);

      if (!result.success) {
        showToast(result.error, "error");
        return;
      }

      setRows((current) =>
        current.map((row) => (row.id === id ? { ...row, featured } : row)),
      );
      showToast("Featured state updated.", "success");
    });
  };

  return (
    <>
      <div className="admin-card p-6">
        <div className="flex items-center justify-between gap-4">
          <div>
            <h1 className="text-xl font-semibold text-[#0F2447]">Blog Posts</h1>
            <p className="mt-1 text-sm text-[#4B5563]">Manage editorial content for the public blog.</p>
          </div>
          <Link href="/admin/blog/new" className="admin-button-primary">
            <span className="text-base leading-none">+</span>
            <span>New Post</span>
          </Link>
        </div>

        <div className="mt-6">
          <AdminTable
            rows={rows}
            rowKey={(row) => row.id}
            loading={isPending}
            emptyTitle="No posts created yet"
            emptyMessage="Publish the first article to start building the resource center."
            emptyAction={
              <Link href="/admin/blog/new" className="admin-button-primary">
                Create First Post
              </Link>
            }
            columns={[
              {
                header: "Title",
                render: (row) => (
                  <div>
                    <div className="font-semibold text-[#0F2447]">{row.title}</div>
                    <div className="mt-1 text-sm text-[#1F2937]/60">/{row.slug}</div>
                  </div>
                ),
              },
              {
                header: "Category",
                render: (row) => row.category || "—",
              },
              {
                header: "Status",
                render: (row) => <AdminBadge status={row.status} />,
              },
              {
                header: "Published Date",
                render: (row) => formatDate(row.publishedAt),
              },
              {
                header: "Featured",
                render: (row) => (
                  <div onClick={(event) => event.stopPropagation()}>
                    <AdminToggle
                      checked={row.featured}
                      onChange={(checked) => toggleFeatured(row.id, checked)}
                    />
                  </div>
                ),
              },
              {
                header: "Actions",
                render: (row) => (
                  <div className="flex gap-2">
                    <Link href={`/admin/blog/${row.id}`} className="admin-button-secondary !px-3 !py-2">
                      Edit
                    </Link>
                    <button
                      type="button"
                      className="admin-button-danger !px-3 !py-2"
                      onClick={() => setSelectedId(row.id)}
                    >
                      Delete
                    </button>
                  </div>
                ),
              },
            ]}
          />
        </div>
      </div>

      <AdminConfirmModal
        open={Boolean(selectedId)}
        onClose={() => setSelectedId(null)}
        onConfirm={() => (selectedId ? remove(selectedId) : undefined)}
        title="Delete Blog Post"
        message="This article will be removed from the admin portal and the public blog immediately."
      />
    </>
  );
}
