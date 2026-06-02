import { Question } from "../types";

interface QuestionCardProps {
  isCorrect: boolean | null;
  onSelect: (formula: string) => void;
  question: Question;
  selectedFormula: null | string;
}

export default function QuestionCard({
  isCorrect,
  onSelect,
  question,
  selectedFormula,
}: QuestionCardProps) {
  const correctFormula = question.choices.find((c) => c.correct)?.formula;

  return (
    <div
      className="flex flex-col gap-3 border-gray-700 rounded-xl bg-[#111827] p-3"
      style={{ fontFamily: "'Courier New', Courier, monospace" }}
    >
      {/* Header */}
      <div className="flex flex-col items-center gap-0.5 text-center">
        <span className="text-xs uppercase tracking-widest text-green-400">
          Choose the missing reactant
        </span>
        <span className="text-[10px] uppercase tracking-widest text-gray-500">
          {question.classification.replace("_", " ")}
        </span>
      </div>

      {/* Formula */}
      <p className="text-base text-gray-100 font-bold tracking-wide text-center">
        {question.formula}
      </p>

      {/* Choices */}
      <div className="flex flex-col gap-2">
        {question.choices.map((choice) => (
          <button
            className={`w-full px-3 py-2 text-left text-sm border rounded-lg transition-colors 
          ${
            selectedFormula === choice.formula
              ? choice.correct
                ? "border-green-500 text-green-400 bg-green-950"
                : "border-red-500 text-red-400 bg-red-950"
              : selectedFormula !== null && choice.correct
                ? "border-green-500 text-green-400 bg-green-950"
                : "border-gray-700 bg-[#0d1117] text-gray-300 hover:border-green-600 hover:text-green-400"
          }`}
            disabled={selectedFormula !== null}
            key={choice.formula}
            onClick={() => onSelect(choice.formula)}
          >
            {choice.formula}
          </button>
        ))}
      </div>

      {/* Result banner */}
      {selectedFormula !== null && (
        <div
          className={`px-3 py-2 rounded-lg border text-sm flex flex-col gap-0.5 ${
            isCorrect
              ? "border-green-700 bg-green-950 text-green-400"
              : "border-red-700 bg-red-950 text-red-400"
          }`}
        >
          <span className="font-bold">
            {isCorrect ? "✓ Correct!" : "✗ Wrong"}
          </span>
          {!isCorrect && (
            <span className="text-xs text-gray-400">
              The correct answer was{" "}
              <span className="text-green-400 font-semibold">
                {correctFormula}
              </span>
            </span>
          )}
        </div>
      )}
    </div>
  );
}
