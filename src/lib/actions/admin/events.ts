"use server";

import { revalidatePath } from "next/cache";
import type { Event, EventStatus, EventType } from "@/lib/types/database";
import { slugify, toNullableString, toOptionalDate } from "@/lib/admin-utils";
import prisma from "@/lib/prisma";
import { adminActionError, type AdminActionResult } from "@/lib/actions/admin/result";

export type EventInput = {
  date: string;
  description: string;
  featured: boolean;
  imageUrl: string;
  isPast: boolean;
  location: string;
  name: string;
  slug: string;
  status: EventStatus;
  type: EventType;
};

function toEventData(input: EventInput) {
  return {
    date: toOptionalDate(input.date),
    description: toNullableString(input.description),
    featured: input.featured,
    imageUrl: toNullableString(input.imageUrl),
    isPast: input.isPast,
    location: toNullableString(input.location),
    name: input.name.trim(),
    slug: slugify(input.slug || input.name),
    status: input.status,
    type: input.type,
  };
}

function revalidateEventPaths() {
  revalidatePath("/admin/dashboard");
  revalidatePath("/admin/events");
  revalidatePath("/events");
}

export async function createEvent(input: EventInput): Promise<AdminActionResult<Event>> {
  try {
    const event = await prisma.event.create({ data: toEventData(input) });
    revalidateEventPaths();
    return { data: event, success: true };
  } catch (error) {
    return adminActionError(error, "Unable to create event.");
  }
}

export async function updateEvent(id: string, input: EventInput): Promise<AdminActionResult<Event>> {
  try {
    const event = await prisma.event.update({
      data: toEventData(input),
      where: { id },
    });
    revalidateEventPaths();
    return { data: event, success: true };
  } catch (error) {
    return adminActionError(error, "Unable to update event.");
  }
}

export async function deleteEvent(id: string): Promise<AdminActionResult<{ id: string }>> {
  try {
    const event = await prisma.event.delete({ where: { id } });
    revalidateEventPaths();
    return { data: { id: event.id }, success: true };
  } catch (error) {
    return adminActionError(error, "Unable to delete event.");
  }
}
