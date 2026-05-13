"use server";

import prisma from "@/lib/prisma";

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
  const name = getTrimmedValue(formData, "name");
  const email = getTrimmedValue(formData, "email");
  const phone = getTrimmedValue(formData, "phone");
  const subject = getTrimmedValue(formData, "subject");
  const serviceOfInterest = getTrimmedValue(formData, "service_of_interest");
  const message = getTrimmedValue(formData, "message");

  const errors: InquiryActionErrors = {};

  if (!name) {
    errors.name = "Name is required.";
  }

  if (!email) {
    errors.email = "Email is required.";
  } else if (!emailPattern.test(email)) {
    errors.email = "Enter a valid email address.";
  }

  if (!message) {
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
    await prisma.inquiry.create({
      data: {
        email,
        message,
        name,
        phone: phone || null,
        serviceOfInterest: serviceOfInterest || null,
        subject: subject || null,
      },
    });

    return {
      message: "Your inquiry has been submitted successfully.",
      success: true,
    };
  } catch (error) {
    console.error("Failed to submit inquiry:", error);
    return {
      message: "We could not submit your inquiry right now. Please try again shortly.",
      success: false,
    };
  }
}
