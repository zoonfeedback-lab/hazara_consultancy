import prisma from "@/lib/prisma";
import { BlogPostsManager } from "@/components/admin/blog-posts-manager";

export default async function AdminBlogPage() {
  const posts = await prisma.blogPost.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <BlogPostsManager
      posts={posts.map((post) => ({
        ...post,
        createdAt: post.createdAt.toISOString(),
        publishedAt: post.publishedAt?.toISOString() ?? null,
        updatedAt: post.updatedAt.toISOString(),
      }))}
    />
  );
}
