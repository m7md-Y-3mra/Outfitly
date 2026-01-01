"use client";
import { TIconType } from "../types/generator.types";
import { AnimatePresence, motion } from "framer-motion";
import { useTheme } from "next-themes";
interface IProps {
  label: string;
  Icon: TIconType;
  selected: boolean;
}
const SelectCard = ({ label, Icon, selected }: IProps) => {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  return (
    <div
      className={[
        "relative overflow-hidden rounded-xl border-2 p-4 text-center transition-all duration-300",
        // ✅ Dark-only border enhancement (unselected)
        !selected && isDark
          ? "border-[rgba(242,241,237,0.18)] hover:border-[rgba(242,241,237,0.28)]"
          : "",
      ].join(" ")}
      style={{
        // keep selected border as brand
        borderColor: selected ? "#671425" : undefined,

        backgroundColor: selected
          ? isDark
            ? "rgba(103, 20, 37, 0.2)"
            : "rgba(103, 20, 37, 0.08)"
          : isDark
            ? "#2A2A30"
            : "#FFFFFF",

        boxShadow: selected ? "0 0 20px rgba(103, 20, 37, 0.3)" : "none",
      }}
    >
      <AnimatePresence>
        {selected && (
          <motion.div
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "linear-gradient(135deg, rgba(103, 20, 37, 0.15) 0%, rgba(139, 29, 53, 0.1) 50%, transparent 100%)",
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          />
        )}
      </AnimatePresence>

      <div className="relative z-10">
        <motion.div
          className="mx-auto mb-2 flex h-10 w-10 items-center justify-center rounded-xl border transition-all duration-300"
          style={{
            background: selected
              ? "linear-gradient(135deg, #671425 0%, #8B1D35 50%, #A8254A 100%)"
              : isDark
                ? "#35353D"
                : "#F2E8E3",

            borderColor: selected
              ? "rgba(103, 20, 37, 0.5)"
              : isDark
                ? "rgba(242,241,237,0.18)"
                : "rgba(103, 20, 37, 0.1)",

            color: selected ? "#FAF1ED" : isDark ? "#F2E8E3" : "#671425",
          }}
          animate={selected ? { scale: [1, 1.08, 1] } : {}}
          transition={{ duration: 0.5 }}
        >
          <Icon className="h-5 w-5" />
        </motion.div>

        <p
          className="text-xs transition-colors duration-300"
          style={{
            color: selected ? (isDark ? "#FAF1ED" : "#671425") : isDark ? "#F2E8E3" : "#4C1420",
          }}
        >
          {label}
        </p>
      </div>
    </div>
  );
};

export default SelectCard;
