import type { Metadata } from "next";
import AIGenerator from "@/modules/AI-generator";
import { getTranslations } from "next-intl/server";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("AIGenerator");
  return {
    title: t("pageTitle"),
    description: t("pageDescription"),
  };
}

const AIGeneratorPage = async () => {
  return <AIGenerator />;
};

export default AIGeneratorPage;
