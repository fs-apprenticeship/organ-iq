import { Question } from "./types";

export const DUMMY_QUESTIONS: Question[] = [
  {
    choices: [
      { correct: true, formula: "H2SO4" },
      { correct: false, formula: "HCl" },
      { correct: false, formula: "NaOH" },
      { correct: false, formula: "HBr" },
    ],
    classification: "reactant_missing",
    created_at: "2026-05-27T10:28:36.863Z",
    difficulty: "easy",
    formula: "CH3CH2OH + _____ → CH2=CH2 + H2O",
    id: 1,
    updated_at: "2026-05-27T10:28:36.863Z",
  },
  {
    choices: [
      { correct: true, formula: "HBr" },
      { correct: false, formula: "HCl" },
      { correct: false, formula: "NaOH" },
      { correct: false, formula: "H2O" },
    ],
    classification: "reactant_missing",
    created_at: "2026-05-27T10:28:36.863Z",
    difficulty: "easy",
    formula: "CH3OH + _____ → CH3Br + H2O",
    id: 2,
    updated_at: "2026-05-27T10:28:36.863Z",
  },
];
