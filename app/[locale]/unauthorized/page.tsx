"use client";

import { Button } from "@/components/ui/button";
import { LockKeyhole, LogIn, Home } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";

export default function Unauthorized() {
  const t = useTranslations("Errors.unauthorized");
  const tCommon = useTranslations("Common");
  const tNav = useTranslations("Navigation");

  return (
    <div className="flex h-screen items-center justify-center bg-gradient-to-br from-background to-muted/20">
      <div className="mx-4 flex max-w-md flex-col items-center justify-center gap-6 text-center">
        <div className="relative">
          <div className="absolute inset-0 animate-pulse rounded-full bg-yellow-500/20 blur-xl" />
          <div className="relative rounded-full bg-yellow-500/10 p-6">
            <LockKeyhole className="h-16 w-16 text-yellow-500" />
          </div>
        </div>

        <div className="space-y-3">
          <h1 className="text-6xl font-bold tracking-tight">{t("code")}</h1>
          <h2 className="text-xl font-semibold text-muted-foreground">{t("heading")}</h2>
          <p className="text-sm text-muted-foreground/80">{t("message")}</p>
        </div>

        <div className="flex gap-3">
          <Button asChild size="lg" className="gap-2">
            <Link href="/sign-in">
              <LogIn className="h-4 w-4" />
              {tNav("signIn")}
            </Link>
          </Button>
          <Button asChild variant="outline" size="lg" className="gap-2">
            <Link href="/">
              <Home className="h-4 w-4" />
              {tCommon("goHome")}
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
