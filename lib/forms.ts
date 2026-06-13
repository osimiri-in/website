import { z } from "zod";

export const generalEnquirySchema = z.object({
  name: z.string().min(2, "Please enter your name."),
  phone: z.string().min(8, "Please enter a valid phone number."),
  email: z.string().email("Enter a valid email.").optional().or(z.literal("")),
  city: z.string().min(2, "Please enter your city."),
  requirement: z.string().min(8, "Please share a short requirement."),
  sourcePage: z.string().optional(),
});

export const customEnquirySchema = z.object({
  name: z.string().min(2),
  phone: z.string().min(8),
  email: z.string().email().optional().or(z.literal("")),
  city: z.string().min(2),
  projectType: z.string().min(2),
  brief: z.string().min(12),
});

export const architectEnquirySchema = z.object({
  name: z.string().min(2),
  firmName: z.string().min(2),
  phone: z.string().min(8),
  email: z.string().email(),
  city: z.string().min(2),
  projectType: z.string().min(2),
  projectScale: z.string().min(2),
});

export const contactLeadSchema = z.object({
  name: z.string().min(2),
  phone: z.string().min(8),
  email: z.string().email().optional().or(z.literal("")),
  city: z.string().min(2),
  message: z.string().min(10),
});

export const appointmentSchema = z.object({
  name: z.string().min(2),
  phone: z.string().min(8),
  email: z.string().email().optional().or(z.literal("")),
  preferredDate: z.string().min(1),
  timeSlot: z.string().min(1),
  message: z.string().optional(),
});

export const newsletterSchema = z.object({
  email: z.string().email("Enter a valid email address."),
});

export const formSchemas = {
  general_enquiries: generalEnquirySchema,
  custom_enquiries: customEnquirySchema,
  architect_enquiries: architectEnquirySchema,
  contact_leads: contactLeadSchema,
  experience_appointments: appointmentSchema,
  newsletter: newsletterSchema,
};

export type AllowedFormTable = keyof typeof formSchemas;
