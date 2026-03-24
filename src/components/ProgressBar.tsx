interface ProgressBarProps {
  current: number;
  total: number;
}

export default function ProgressBar({ current, total }: ProgressBarProps) {
  const pct = total > 0 ? ((current + 1) / total) * 100 : 0;

  return (
    <div className="w-full h-[3px] bg-border rounded-full overflow-hidden">
      <div
        className="h-full rounded-full bg-gradient-to-r from-accent to-pink transition-all duration-500 ease-out"
        style={{ width: `${Math.min(pct, 100)}%` }}
      />
    </div>
  );
}
