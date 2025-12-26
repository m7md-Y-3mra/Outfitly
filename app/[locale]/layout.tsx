import { NextIntlClientProvider } from "next-intl";
import { DirectionProvider } from "@/components/direction-provider";

export default async function LocaleLayout({ children }: { children: React.ReactNode }) {
  return (
    <NextIntlClientProvider>
      <DirectionProvider>{children}</DirectionProvider>
    </NextIntlClientProvider>
  );
}
