"use client";
import { stats } from "../my-wardrobe-stats/myWardrobeStats.constant";
import MyWardrobeStatsCard from "../my-wardrobe-stats-card/myWardrobeStatsCard";
import { FC } from "react";
import { MyWardrobeStatsCardsResponse } from "./myWardrobeStatsCards.types";

const MyWardrobeStatsCards: FC<MyWardrobeStatsCardsResponse> = ({ data }) => {
  return (
    <>
      {stats(data).map((stat, index) => {
        const Icon = stat.icon;
        return (
          <MyWardrobeStatsCard
            key={stat.label}
            label={stat.label}
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
