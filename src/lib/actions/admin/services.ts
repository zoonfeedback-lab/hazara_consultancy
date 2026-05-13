"use server";

import { revalidatePath } from "next/cache";
import type { Service, ServiceStatus } from "@/lib/types/database";
import { slugify, toInteger, toNullableString } from "@/lib/admin-utils";
import prisma from "@/lib/prisma";
import { adminActionError, type AdminActionResult } from "@/lib/actions/admin/result";

export type ServiceInput = {
  benefits: string[];
  description: string;
  featured: boolean;
  name: string;
  slug: string;
  sortOrder: string;
  status: ServiceStatus;
  tagline: string;
  whoItsFor: string;
};

function toServiceData(input: ServiceInput) {
  return {
    benefits: input.benefits.map((item) => item.trim()).filter(Boolean),
    description: toNullableString(input.description),
    featured: input.featured,
    name: input.name.trim(),
    slug: slugify(input.slug || input.name),
    sortOrder: toInteger(input.sortOrder),
    status: input.status,
    tagline: toNullableString(input.tagline),
    whoItsFor: toNullableString(input.whoItsFor),
  };
}

function revalidateServicePaths(slug?: string) {
  revalidatePath("/admin/services");
  revalidatePath("/services");
  if (slug) {
    revalidatePath(`/services/${slug}`);
  }
}

export async function createService(input: ServiceInput): Promise<AdminActionResult<Service>> {
  try {
    const service = await prisma.service.create({ data: toServiceData(input) });
    revalidateServicePaths(service.slug);
    return { data: service, success: true };
  } catch (error) {
    return adminActionError(error, "Unable to create service.");
  }
}

export async function updateService(
  id: string,
  input: ServiceInput,
): Promise<AdminActionResult<Service>> {
  try {
    const service = await prisma.service.update({
      data: toServiceData(input),
      where: { id },
    });
    revalidateServicePaths(service.slug);
    return { data: service, success: true };
  } catch (error) {
    return adminActionError(error, "Unable to update service.");
  }
}

export async function deleteService(id: string): Promise<AdminActionResult<{ id: string }>> {
  try {
    const service = await prisma.service.delete({ where: { id } });
    revalidateServicePaths(service.slug);
    return { data: { id: service.id }, success: true };
  } catch (error) {
    return adminActionError(error, "Unable to delete service.");
  }
}
