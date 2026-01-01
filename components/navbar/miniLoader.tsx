export function MiniLoader({ color }: { color: string }) {
  return (
    <div className="flex items-center gap-2 px-3 py-2 rounded-xl">
      <span
        className="inline-block w-4 h-4 rounded-full border-2 border-transparent animate-spin"
        style={{
          borderTopColor: color,
          borderRightColor: color,
          opacity: 0.9,
        }}
      />
      <span className="text-sm opacity-70" style={{ color }}>
        Loading...
      </span>
    </div>
  );
}
