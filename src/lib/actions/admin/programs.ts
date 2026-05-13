"use server";

import { revalidatePath } from "next/cache";
import type { Program, ProgramStatus, ProgramType } from "@/lib/types/database";
import { slugify, toInteger, toNullableString } from "@/lib/admin-utils";
import prisma from "@/lib/prisma";
import { adminActionError, type AdminActionResult } from "@/lib/actions/admin/result";

export type ProgramInput = {
  curriculum: string[];
  description: string;
  duration: string;
  featured: boolean;
  name: string;
  schedule: string;
  slug: string;
  sortOrder: string;
  status: ProgramStatus;
  type: ProgramType;
};

function toProgramData(input: ProgramInput) {
  return {
    curriculum: input.curriculum.map((item) => item.trim()).filter(Boolean),
    description: toNullableString(input.description),
    duration: toNullableString(input.duration),
    featured: input.featured,
    name: input.name.trim(),
    schedule: toNullableString(input.schedule),
    slug: slugify(input.slug || input.name),
    sortOrder: toInteger(input.sortOrder),
    status: input.status,
    type: input.type,
  };
}

function revalidateProgramPaths() {
  revalidatePath("/admin/dashboard");
  revalidatePath("/admin/programs");
  revalidatePath("/programs");
}

export async function createProgram(input: ProgramInput): Promise<AdminActionResult<Program>> {
  try {
    const program = await prisma.program.create({ data: toProgramData(input) });
    revalidateProgramPaths();
    return { data: program, success: true };
  } catch (error) {
    return adminActionError(error, "Unable to create program.");
  }
}

export async function updateProgram(
  id: string,
  input: ProgramInput,
): Promise<AdminActionResult<Program>> {
  try {
    const program = await prisma.program.update({
      data: toProgramData(input),
      where: { id },
    });
    revalidateProgramPaths();
    return { data: program, success: true };
  } catch (error) {
    return adminActionError(error, "Unable to update program.");
  }
}

export async function deleteProgram(id: string): Promise<AdminActionResult<{ id: string }>> {
  try {
    const program = await prisma.program.delete({ where: { id } });
    revalidateProgramPaths();
    return { data: { id: program.id }, success: true };
  } catch (error) {
    return adminActionError(error, "Unable to delete program.");
  }
}

export async function toggleProgramFeatured(
  id: string,
  featured: boolean,
): Promise<AdminActionResult<{ id: string; featured: boolean }>> {
  try {
    const program = await prisma.program.update({
      data: { featured },
      where: { id },
    });
    revalidateProgramPaths();
    return { data: { featured: program.featured, id: program.id }, success: true };
  } catch (error) {
    return adminActionError(error, "Unable to update featured state.");
  }
}
