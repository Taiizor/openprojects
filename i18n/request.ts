import {getRequestConfig} from 'next-intl/server';
import {cookies} from 'next/headers';
 
export default getRequestConfig(async () => {
  // Get locale from cookie or default to 'tr'
  const cookieStore = await cookies();
  const locale = cookieStore.get('locale')?.value || 'tr';
 
  return {
    locale,
    messages: (await import(`../messages/${locale}.json`)).default
  };
});
