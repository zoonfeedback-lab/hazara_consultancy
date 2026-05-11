"use server";

import { createClient } from "@/lib/supabase/server";
import type { Database } from "@/lib/types/database";

type InquiryInsert = Database["public"]["Tables"]["inquiries"]["Insert"];

type InquiryActionErrors = {
  email?: string;
  message?: string;
  name?: string;
};

export type InquiryActionState =
  | {
      errors: InquiryActionErrors;
      message: string;
      success: false;
    }
  | {
      message: string;
      success: false;
    }
  | {
      message: string;
      success: true;
    };

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function getTrimmedValue(formData: FormData, key: string) {
  const value = formData.get(key);
  return typeof value === "string" ? value.trim() : "";
}

export async function submitInquiry(formData: FormData): Promise<InquiryActionState> {
  const payload: InquiryInsert = {
    email: getTrimmedValue(formData, "email"),
    message: getTrimmedValue(formData, "message"),
    name: getTrimmedValue(formData, "name"),
    phone: getTrimmedValue(formData, "phone") || null,
    service_of_interest: getTrimmedValue(formData, "service_of_interest") || null,
    subject: getTrimmedValue(formData, "subject") || null,
  };

  const errors: InquiryActionErrors = {};

  if (!payload.name) {
    errors.name = "Name is required.";
  }

  if (!payload.email) {
    errors.email = "Email is required.";
  } else if (!emailPattern.test(payload.email)) {
    errors.email = "Enter a valid email address.";
  }

  if (!payload.message) {
    errors.message = "Message is required.";
  }

  if (Object.keys(errors).length > 0) {
    return {
      errors,
      message: "Please correct the highlighted fields and try again.",
      success: false,
    };
  }

  try {
    const supabase = await createClient();
    const { error } = await supabase.from("inquiries").insert(payload);

    if (error) {
      console.error("Failed to submit inquiry:", error);
      return {
        message: "We could not submit your inquiry right now. Please try again shortly.",
        success: false,
      };
    }

    return {
      message: "Your inquiry has been submitted successfully.",
      success: true,
    };
  } catch (error) {
    console.error("Unexpected error while submitting inquiry:", error);
    return {
      message: "We could not submit your inquiry right now. Please try again shortly.",
      success: false,
    };
  }
}
