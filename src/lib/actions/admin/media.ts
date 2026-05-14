"use server";

import { put } from "@vercel/blob";
import { revalidatePath } from "next/cache";
import prisma from "@/lib/prisma";
import { adminActionError, type AdminActionResult } from "@/lib/actions/admin/result";

export async function uploadMedia(formData: FormData) {
  try {
    if (!process.env.BLOB_READ_WRITE_TOKEN) {
      return { success: false, error: "Storage is not configured. Please contact the administrator." };
    }

    const file = formData.get("file") as File | null;

    if (!file || file.size === 0) {
      return { success: false, error: "No file provided." };
    }

    const allowedTypes = ["image/jpeg", "image/png", "image/webp", "image/gif", "image/svg+xml"];

    if (!allowedTypes.includes(file.type)) {
      return {
        success: false,
        error: "File type not supported. Please upload a JPEG, PNG, WebP, GIF, or SVG.",
      };
    }

    const maxSize = 5 * 1024 * 1024;

    if (file.size > maxSize) {
      return { success: false, error: "File is too large. Maximum size is 5MB." };
    }

    const blob = await put(file.name, file, {
      access: "public",
      addRandomSuffix: true,
    });

    const media = await prisma.media.create({
      data: {
        filename: file.name,
        storagePath: blob.pathname,
        publicUrl: blob.url,
        mimeType: file.type,
        sizeBytes: BigInt(file.size),
      },
    });

    revalidatePath("/admin/media");
    return { success: true, data: media };
  } catch (error) {
    console.error("uploadMedia failed:", error);
    return { success: false, error: "Upload failed. Please try again." };
  }
}

export async function deleteMedia(id: string): Promise<AdminActionResult<{ id: string }>> {
  try {
    const media = await prisma.media.delete({ where: { id } });
    revalidatePath("/admin/media");
    return { data: { id: media.id }, success: true };
  } catch (error) {
    return adminActionError(error, "Unable to delete media item.");
  }
}
