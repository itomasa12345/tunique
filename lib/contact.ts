export const contactFormName = "tunique-contact";
// Enable in Netlify only after detection, email notification and privacy review.
export const contactFormEnabled =
  process.env.NEXT_PUBLIC_CONTACT_FORM_ENABLED === "true";
