export const formatCount = (value: number): string => {
  return value.toLocaleString();
};

export const formatRate = (activeUsers: number, totalUsers: number, decimals = 1): string => {
  if (totalUsers === 0) return "0%";

  const rate = (activeUsers / totalUsers) * 100;
  return `${rate.toFixed(decimals)}%`;
};

export const formatCompact = (n: number) => {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1).replace(/\.0$/, "")}M`;
  if (n >= 1_000) return `${(n / 1_000).toFixed(1).replace(/\.0$/, "")}k`;
  return `${n}`;
};
