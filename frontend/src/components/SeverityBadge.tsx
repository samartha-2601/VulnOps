interface Props {
  severity: string;
}

export default function SeverityBadge({
  severity,
}: Props) {
  const styles = {
    Critical:
      "bg-red-600 text-white",

    High:
      "bg-orange-500 text-white",

    Medium:
      "bg-yellow-500 text-black",

    Low:
      "bg-green-600 text-white",
  };

  return (
    <span
      className={`rounded px-3 py-1 text-sm font-semibold ${
        styles[
          severity as keyof typeof styles
        ] || "bg-slate-700"
      }`}
    >
      {severity}
    </span>
  );
}