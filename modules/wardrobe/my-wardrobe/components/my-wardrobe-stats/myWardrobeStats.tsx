import { getWardrobeStatsAction } from "@/modules/wardrobe/wardrobe.action";
import MyWardrobeStatsCards from "../my-wardrobe-stats-cards";

const MyWardrobeStats = async () => {
  const res = await getWardrobeStatsAction();

  if (!res.success) {
    console.log(res.errors);
    throw new Error("Failed to load wardrobe statistics. Please try again later.");
  }

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
      {<MyWardrobeStatsCards data={res.data} />}
    </div>
  );
};

export default MyWardrobeStats;
