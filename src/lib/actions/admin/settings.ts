"use server";

import { revalidatePath } from "next/cache";
import type { Settings } from "@/lib/types/database";
import { toNullableString, toOptionalInteger } from "@/lib/admin-utils";
import prisma from "@/lib/prisma";
import { adminActionError, type AdminActionResult } from "@/lib/actions/admin/result";

export type SettingsInput = {
  address: string;
  consultancyName: string;
  contactEmail: string;
  facebookUrl: string;
  facultyCount: string;
  instagramUrl: string;
  linkedinUrl: string;
  passRate: string;
  phone: string;
  programsLaunched: string;
  studentsMentored: string;
  tagline: string;
  whatsappNumber: string;
  whatsappUrl: string;
  youtubeUrl: string;
};

export async function updateSettings(
  input: SettingsInput,
): Promise<AdminActionResult<Settings>> {
  try {
    const settings = await prisma.settings.upsert({
      create: {
        address: toNullableString(input.address),
        consultancyName: toNullableString(input.consultancyName),
        contactEmail: toNullableString(input.contactEmail),
        facebookUrl: toNullableString(input.facebookUrl),
        facultyCount: toOptionalInteger(input.facultyCount),
        id: 1,
        instagramUrl: toNullableString(input.instagramUrl),
        linkedinUrl: toNullableString(input.linkedinUrl),
        passRate: toOptionalInteger(input.passRate),
        phone: toNullableString(input.phone),
        programsLaunched: toOptionalInteger(input.programsLaunched),
        studentsMentored: toOptionalInteger(input.studentsMentored),
        tagline: toNullableString(input.tagline),
        whatsappNumber: toNullableString(input.whatsappNumber),
        whatsappUrl: toNullableString(input.whatsappUrl),
        youtubeUrl: toNullableString(input.youtubeUrl),
      },
      update: {
        address: toNullableString(input.address),
        consultancyName: toNullableString(input.consultancyName),
        contactEmail: toNullableString(input.contactEmail),
        facebookUrl: toNullableString(input.facebookUrl),
        facultyCount: toOptionalInteger(input.facultyCount),
        instagramUrl: toNullableString(input.instagramUrl),
        linkedinUrl: toNullableString(input.linkedinUrl),
        passRate: toOptionalInteger(input.passRate),
        phone: toNullableString(input.phone),
        programsLaunched: toOptionalInteger(input.programsLaunched),
        studentsMentored: toOptionalInteger(input.studentsMentored),
        tagline: toNullableString(input.tagline),
        whatsappNumber: toNullableString(input.whatsappNumber),
        whatsappUrl: toNullableString(input.whatsappUrl),
        youtubeUrl: toNullableString(input.youtubeUrl),
      },
      where: { id: 1 },
    });

    revalidatePath("/admin/settings");
    revalidatePath("/");
    revalidatePath("/contact");

    return { data: settings, success: true };
  } catch (error) {
    return adminActionError(error, "Unable to update settings.");
  }
}
