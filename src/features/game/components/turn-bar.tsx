export default function TurnBar() {
  return (
    <div
      className={`grid grid-cols-4 gap-2 w-full rounded-xl border p-3 transition-colors duration-300`}
    >
      <Cell label="Whose Turn" subtle={true}>
        {"Computer"}
      </Cell>

      <Cell label="Turn" subtle={true}>
        {"5"}
      </Cell>

      <Cell label="Phase" subtle={true}>
        {"Play"}
      </Cell>

      <Cell label="Time" subtle={true}>
        {"18 Seconds"}
      </Cell>
    </div>
  );
}

function Cell({
  children,
  label,
  subtle,
}: {
  children?: React.ReactNode;
  label: string;
  subtle: boolean;
}) {
  return (
    <div
      className={`flex flex-col items-center justify-center gap-0.5 rounded-lg border px-3 py-2 transition-colors duration-300 ${
        subtle ? "border-red-100 bg-red-50/60" : "border-blue-100 bg-blue-50"
      }`}
    >
      <span className="text-[10px] font-medium uppercase tracking-widest text-neutral-400">
        {label}
      </span>
      {children}
    </div>
  );
}
