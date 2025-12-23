export const formatCount = (value: number): string => {
  return value.toLocaleString();
};

export const formatEngagementRate = (
  activeUsers: number,
  totalUsers: number,
  decimals = 1,
): string => {
  if (totalUsers === 0) return "0%";

  const rate = (activeUsers / totalUsers) * 100;
  return `${rate.toFixed(decimals)}%`;
};
