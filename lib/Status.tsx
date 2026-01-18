import { cn } from "@/lib/utils";

// Define the available colors to match your variables
const STATUS_COLORS = {
  green: "#0bbf0b",
  red: "#c51b1b",
  orange: "#db8719",
} as const;

type StatusType = keyof typeof STATUS_COLORS;

interface StatusIndicatorProps {
  status: StatusType;
  label?: string;
  className?: string;
}

export function StatusIndicator({
  status,
  className,
  label = "",
}: StatusIndicatorProps) {
  const color = STATUS_COLORS[status];

  return (
    <>
      {/* <tspan
        fill={color}
        stroke={color}
        className="svg-dot-pulse"
        style={{
          fontSize: "1.4em",
          dominantBaseline: "middle",
        }}
      >
        ●
      </tspan> */}
      <tspan
        fill={color}
        // dx="-0.8em"
        // dy="0.25em"
        style={{ fontSize: "1em" }}
      >
        ●
      </tspan>

      {/* The Text Label */}
      {label && (
        <tspan
          dx="12"
          dy="0"
          fill="#3b495e"
          style={{ fontSize: "16px", fontWeight: 500 }}
        >
          {label}
        </tspan>
      )}
    </>
  );
}
