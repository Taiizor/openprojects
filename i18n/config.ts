import { notFound } from "next/navigation";
import { getRequestConfig } from "next-intl/server";
import { cookies } from "next/headers";

// Can be imported from a shared config
const locales = ["tr", "en"];

export default getRequestConfig(async () => {
  // Get locale from cookie or default to 'tr'
  const cookieStore = await cookies();
  const locale = cookieStore.get("locale")?.value || "tr";

  // Validate that the incoming `locale` parameter is valid
  if (!locales.includes(locale as any)) {
    return {
      locale: "tr",
      messages: (await import(`../messages/tr.json`)).default,
    };
  }

  return {
    locale,
    messages: (await import(`../messages/${locale}.json`)).default,
  };
});
