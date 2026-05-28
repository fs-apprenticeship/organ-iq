const DUMMY_SCORES = [
  {
    key: "human",
    label: "1 + 1 + 1 = 3",
    leading: true,
    name: "You",
    score: 3,
  },
  { key: "ai", label: "1 + 1 = 2", leading: false, name: "AI", score: 2 },
];

export default function ScoreBoard() {
  const tied = DUMMY_SCORES[0].score === DUMMY_SCORES[1].score;

  return (
    <div
      className="rounded-xl border border-gray-700 bg-[#111827] p-4 w-full max-w-xl mx-auto"
      style={{ fontFamily: "'Courier New', Courier, monospace" }}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <span className="text-[10px] uppercase tracking-widest text-green-400">
          Score
        </span>
        {tied && (
          <span className="rounded-full border border-gray-600 px-2 py-0.5 text-[9px] uppercase tracking-wide text-gray-400">
            Tied
          </span>
        )}
      </div>

      {/* Score rows */}
      <div className="flex flex-col gap-2">
        {DUMMY_SCORES.map(({ key, label, leading, name, score }) => (
          <div
            className={`flex items-center justify-between rounded-lg border px-3 py-2 transition-all duration-200 ${
              leading
                ? "border-green-700 bg-green-950"
                : "border-gray-700 bg-[#0d1117]"
            }`}
            key={key}
          >
            {/* Name + equation */}
            <div className="flex flex-col gap-0.5">
              <div className="flex items-center gap-1.5">
                {leading && <span className="text-[10px]">👑</span>}
                <span
                  className={`text-[11px] font-semibold ${
                    leading ? "text-green-400" : "text-gray-500"
                  }`}
                >
                  {name}
                </span>
              </div>
              <span className="text-[10px] text-gray-500">{label}</span>
            </div>

            {/* Total */}
            <span
              className={`text-2xl font-bold tabular-nums ${
                leading ? "text-green-400" : "text-gray-600"
              }`}
            >
              {score}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
