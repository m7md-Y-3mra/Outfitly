"use client";
import { stats } from "../my-wardrobe-stats/myWardrobeStats.constant";
import MyWardrobeStatsCard from "../my-wardrobe-stats-card/myWardrobeStatsCard";
import { FC } from "react";
import { MyWardrobeStatsCardsResponse } from "./myWardrobeStatsCards.types";
import { useTranslations } from "next-intl";

const MyWardrobeStatsCards: FC<MyWardrobeStatsCardsResponse> = ({ data }) => {
  const t = useTranslations("Wardrobe.stats");

  return (
    <>
      {stats(data).map((stat, index) => {
        const Icon = stat.icon;
        return (
          <MyWardrobeStatsCard
            key={stat.labelKey}
            label={t(stat.labelKey)}
            value={stat.value}
            icon={Icon}
            gradient={stat.gradient}
            index={index}
          />
        );
      })}
    </>
  );
};

export default MyWardrobeStatsCards;
