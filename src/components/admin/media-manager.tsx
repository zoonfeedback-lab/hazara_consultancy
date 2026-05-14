/* eslint-disable @next/next/no-img-element */
"use client";

import { useRef, useState, useTransition } from "react";
import { AdminConfirmModal } from "@/components/admin/admin-confirm-modal";
import { useToast } from "@/components/admin/toast";
import { deleteMedia, uploadMedia } from "@/lib/actions/admin/media";
import type { Media } from "@/lib/types/database";

function formatFileSize(sizeInBytes: number) {
  if (sizeInBytes < 1024) {
    return `${sizeInBytes} B`;
  }

  const sizeInKb = sizeInBytes / 1024;

  if (sizeInKb < 1024) {
    return `${sizeInKb.toFixed(1)} KB`;
  }

  return `${(sizeInKb / 1024).toFixed(1)} MB`;
}

export function MediaManager({ media }: { media: Media[] }) {
  const { showToast } = useToast();
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [rows, setRows] = useState(media);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const remove = (id: string) => {
    startTransition(async () => {
      const result = await deleteMedia(id);

      if (!result.success) {
        showToast(result.error, "error");
        return;
      }

      setRows((current) => current.filter((item) => item.id !== id));
      setSelectedId(null);
      showToast("Media item deleted.", "success");
    });
  };

  const handleUpload = () => {
    if (!selectedFile) {
      return;
    }

    startTransition(async () => {
      const formData = new FormData();
      formData.set("file", selectedFile);

      const result = await uploadMedia(formData);

      if (!result.success || !result.data) {
        showToast(result.error ?? "Upload failed. Please try again.", "error");
        return;
      }

      setRows((current) => [result.data, ...current]);
      setSelectedFile(null);

      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }

      showToast("Image uploaded successfully.", "success");
    });
  };

  const copyUrl = async (url: string) => {
    try {
      await navigator.clipboard.writeText(url);
      showToast("Media URL copied.", "success");
    } catch (error) {
      console.error("Unable to copy media URL:", error);
      showToast("Could not copy the media URL.", "error");
    }
  };

  return (
    <>
      <div className="space-y-6">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-xl font-semibold text-[#0F2447]">Media</h1>
            <p className="mt-1 text-sm text-[#4B5563]">Review uploaded image references and prepare for storage integration.</p>
          </div>
          <div className="flex flex-col gap-3 md:items-end">
            <div className="flex flex-wrap items-center gap-3">
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(event) => setSelectedFile(event.target.files?.[0] ?? null)}
              />
              <button
                type="button"
                className="admin-button-secondary"
                onClick={() => fileInputRef.current?.click()}
              >
                Choose Image
              </button>
              <button
                type="button"
                className="admin-button-primary"
                onClick={handleUpload}
                disabled={!selectedFile || isPending}
              >
                {isPending ? "Uploading..." : "Upload"}
              </button>
            </div>
            {selectedFile ? (
              <p className="text-sm text-[#4B5563]">
                {selectedFile.name} ({formatFileSize(selectedFile.size)})
              </p>
            ) : null}
          </div>
        </div>

        {rows.length === 0 ? (
          <div className="admin-empty-state">
            <div className="text-base font-semibold text-[#0F2447]">No media uploaded yet</div>
            <p className="text-sm text-[#4B5563]">Upload the first image to begin building the media library.</p>
          </div>
        ) : (
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {rows.map((item) => (
              <div key={item.id} className="admin-card overflow-hidden p-4">
                <div className="h-[200px] overflow-hidden rounded-[12px] bg-[#F0EDE6]">
                  <img
                    src={item.publicUrl}
                    alt={item.altText ?? item.filename}
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="mt-3 truncate text-xs font-medium text-[#1F2937]">{item.filename}</div>
                <div className="mt-4 flex gap-2">
                  <button
                    type="button"
                    className="admin-button-secondary flex-1 !px-3 !py-2"
                    onClick={() => copyUrl(item.publicUrl)}
                  >
                    Copy URL
                  </button>
                  <button
                    type="button"
                    className="admin-button-danger !px-3 !py-2"
                    onClick={() => setSelectedId(item.id)}
                    disabled={isPending}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <AdminConfirmModal
        open={Boolean(selectedId)}
        onClose={() => setSelectedId(null)}
        onConfirm={() => (selectedId ? remove(selectedId) : undefined)}
        title="Delete Media Item"
        message="This media reference will be removed from the database."
      />
    </>
  );
}
