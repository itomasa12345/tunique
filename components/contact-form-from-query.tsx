"use client";
import { useSearchParams } from "next/navigation";
import { ContactForm } from "@/components/contact-form";

// Keep query-dependent selection out of the server page so metadata is static.
export function ContactFormFromQuery({ enabled }: { enabled: boolean }) {
  const params = useSearchParams();
  const initialType = params.get("type") || "bike";
  return (
    <ContactForm
      key={initialType}
      initialType={initialType}
      enabled={enabled}
    />
  );
}
