import { Question } from "../types";

interface QuestionCardProps {
  isCorrect: boolean | null;
  onSelect: (formula: string) => void;
  question: Question;
  selectedFormula: null | string;
}

export default function QuestionCard({
  onSelect,
  question,
  selectedFormula,
}: QuestionCardProps) {
  return (
    <div
      className="flex flex-col gap-6 border-gray-700 rounded-xl bg-[#111827]"
      style={{ fontFamily: "'Courier New', Courier, monospace" }}
    >
      <span className="text-xs uppercase text-green-400">
        {question.classification.replace("_", " ")}
      </span>
      <p className="text-lg text-gray-100 font-bold tracking-wide">
        {question.formula}
      </p>
      <div className="flex flex-col gap-3">
        {question.choices.map((choice) => (
          <button
            className={`w-full px-4 py-3 text-left text-sm border rounded-lg transition-colors 
                            ${
                              selectedFormula === choice.formula
                                ? "border-green-500 text-green-400 bg-green-950"
                                : "border-gray-700 bg-[#0d1117] text-gray-300 hover:border-green-600 hover:text-green-400"
                            }`}
            key={choice.formula}
            onClick={() => onSelect(choice.formula)}
          >
            {choice.formula}
          </button>
        ))}
      </div>
    </div>
  );
}
