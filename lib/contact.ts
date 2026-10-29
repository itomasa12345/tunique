export const contactFormName = "tunique-contact";
// Netlify production is enabled in netlify.toml after owner confirmation.
// Local development stays disabled unless explicitly enabled for testing.
export const contactFormEnabled =
  process.env.NEXT_PUBLIC_CONTACT_FORM_ENABLED === "true";
