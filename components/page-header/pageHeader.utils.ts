export const getRadialPattern = (isDark: boolean) => {
  return {
    backgroundImage: `radial-gradient(circle at 2px 2px, ${
      isDark ? "var(--outfitly-text-light)" : "var(--outfitly-bg-white)"
    } 1px, transparent 0)`,
    backgroundSize: "40px 40px",
  };
};
