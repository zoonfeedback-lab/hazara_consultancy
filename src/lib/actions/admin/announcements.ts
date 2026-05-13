"use server";

import { revalidatePath } from "next/cache";
import type { Announcement } from "@/lib/types/database";
import { toNullableString, toOptionalDate } from "@/lib/admin-utils";
import prisma from "@/lib/prisma";
import { adminActionError, type AdminActionResult } from "@/lib/actions/admin/result";

export type AnnouncementInput = {
  active: boolean;
  expiresAt: string;
  link: string;
  text: string;
};

function toAnnouncementData(input: AnnouncementInput) {
  return {
    active: input.active,
    expiresAt: toOptionalDate(input.expiresAt),
    link: toNullableString(input.link),
    text: input.text.trim(),
  };
}

function revalidateAnnouncementPaths() {
  revalidatePath("/admin/announcements");
  revalidatePath("/");
}

export async function createAnnouncement(
  input: AnnouncementInput,
): Promise<AdminActionResult<Announcement>> {
  try {
    const announcement = await prisma.announcement.create({ data: toAnnouncementData(input) });
    revalidateAnnouncementPaths();
    return { data: announcement, success: true };
  } catch (error) {
    return adminActionError(error, "Unable to create announcement.");
  }
}

export async function updateAnnouncement(
  id: string,
  input: AnnouncementInput,
): Promise<AdminActionResult<Announcement>> {
  try {
    const announcement = await prisma.announcement.update({
      data: toAnnouncementData(input),
      where: { id },
    });
    revalidateAnnouncementPaths();
    return { data: announcement, success: true };
  } catch (error) {
    return adminActionError(error, "Unable to update announcement.");
  }
}

export async function deleteAnnouncement(
  id: string,
): Promise<AdminActionResult<{ id: string }>> {
  try {
    const announcement = await prisma.announcement.delete({ where: { id } });
    revalidateAnnouncementPaths();
    return { data: { id: announcement.id }, success: true };
  } catch (error) {
    return adminActionError(error, "Unable to delete announcement.");
  }
}

export async function toggleAnnouncementActive(
  id: string,
  active: boolean,
): Promise<AdminActionResult<{ active: boolean; id: string }>> {
  try {
    const announcement = await prisma.announcement.update({
      data: { active },
      where: { id },
    });
    revalidateAnnouncementPaths();
    return { data: { active: announcement.active, id: announcement.id }, success: true };
  } catch (error) {
    return adminActionError(error, "Unable to toggle announcement visibility.");
  }
}
