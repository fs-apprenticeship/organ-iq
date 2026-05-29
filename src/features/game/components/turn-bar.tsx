export default function TurnBar() {
  return (
    <div className="bg-[#0d1117] px-8 pt-12 pb-3">
      <div className="grid grid-cols-4 gap-2 w-full max-w-xl mx-auto rounded-xl border border-gray-700 p-3">
        {CELLS.map(({ label, value }) => (
          <Cell key={label} label={label}>
            {value}
          </Cell>
        ))}
      </div>
    </div>
  );
}

{
  /* Cell data */
}
const CELLS = [
  { label: "Whose Turn", value: "Computer" },
  { label: "Turn", value: "5" },
  { label: "Phase", value: "Play" },
  { label: "Time", value: "18 Seconds" },
];

{
  /* Sub-component */
}
function Cell({
  children,
  label,
}: {
  children: React.ReactNode;
  label: string;
}) {
  return (
    <div className="flex flex-col items-center justify-center gap-0.5 rounded-lg border border-gray-700 bg-[#111827] px-3 py-2">
      <span
        className="text-[10px] font-medium uppercase tracking-widest text-green-400"
        style={{ fontFamily: "'Courier New', Courier, monospace" }}
      >
        {label}
      </span>
      <span
        className="text-sm font-semibold text-gray-100"
        style={{ fontFamily: "'Courier New', Courier, monospace" }}
      >
        {children}
      </span>
    </div>
  );
}
