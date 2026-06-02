export default function ScoreBoard({
  score,
  wrongCount,
  hasAnswered,
  isCorrect,
}: {
  score: number;
  wrongCount: number;
  hasAnswered: boolean;
  isCorrect: boolean | null;
}) {
  const tied = score === wrongCount;

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
        {hasAnswered && tied && (
          <span className="rounded-full border border-gray-600 px-2 py-0.5 text-[9px] uppercase tracking-wide text-gray-400">
            Tied
          </span>
        )}
      </div>

      {/* Score rows */}
      <div className="flex flex-col gap-2">
        {/* Correct Row */}
        <div
          className={`flex items-center justify-between rounded-lg border px-3 py-2 transition-all duration-200 ${
            hasAnswered && isCorrect === true
              ? "border-green-700 bg-green-950"
              : "border-gray-700 bg-[#0d1117]"
          }`}
        >
          <div className="flex items-center gap-1.5">
            {hasAnswered && isCorrect === true && (
              <span className="text-[10px]">👑</span>
            )}
            <span
              className={`text-[11px] font-semibold ${
                hasAnswered && isCorrect === true
                  ? "text-green-400"
                  : "text-gray-500"
              }`}
            >
              Correct
            </span>
          </div>
          <span
            className={`text-2xl font-bold tabular-nums ${
              hasAnswered && isCorrect === true
                ? "text-green-400"
                : "text-gray-600"
            }`}
          >
            {score}
          </span>
        </div>

        {/* Wrong Row */}
        <div
          className={`flex items-center justify-between rounded-lg border px-3 py-2 transition-all duration-200 ${
            hasAnswered && isCorrect === false
              ? "border-red-700 bg-red-950"
              : "border-gray-700 bg-[#0d1117]"
          }`}
        >
          <div className="flex items-center gap-1.5">
            {hasAnswered && isCorrect === false && (
              <span className="text-[10px]">💀</span>
            )}
            <span
              className={`text-[11px] font-semibold ${
                hasAnswered && isCorrect === false
                  ? "text-red-400"
                  : "text-gray-500"
              }`}
            >
              Wrong
            </span>
          </div>
          <span
            className={`text-2xl font-bold tabular-nums ${
              hasAnswered && isCorrect === false
                ? "text-red-400"
                : "text-gray-600"
            }`}
          >
            {wrongCount}
          </span>
        </div>
      </div>
    </div>
  );
}
