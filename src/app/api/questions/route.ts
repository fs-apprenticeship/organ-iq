// app/api/questions/route.ts
import { NextResponse } from "next/server";

const questions = [
  {
    id: 1,
    formula: "CH3CH2OH + _____ → CH2=CH2 + H2O",
    classification: "reactant_missing",
    difficulty: "easy",
    choices: [
      { formula: "H2SO4", correct: true },
      { formula: "HCl", correct: false },
      { formula: "NaOH", correct: false },
      { formula: "HBr", correct: false },
    ],
  },
  {
    id: 2,
    formula: "CH3CH2OH → _____ + H2O",
    classification: "product_missing",
    difficulty: "medium",
    choices: [
      { formula: "CH2=CH2", correct: true },
      { formula: "CH3CH3", correct: false },
      { formula: "CH3CHO", correct: false },
      { formula: "CH3COOH", correct: false },
    ],
  },
  {
    id: 3,
    formula: "CH2=CH2 + Br2 + _____ → CH2BrCH2Br",
    classification: "solvent_missing",
    difficulty: "hard",
    choices: [
      { formula: "CCl4", correct: true },
      { formula: "CH2Cl2", correct: false },
      { formula: "H2O", correct: false },
      { formula: "CH3OH", correct: false },
    ],
  },
  {
    id: 4,
    formula: "CH3CH2OH + _____ → CH2=CH2 + H2O",
    classification: "reactant_missing",
    difficulty: "easy",
    choices: [
      { formula: "H2SO4", correct: true },
      { formula: "NaOH", correct: false },
      { formula: "HCl", correct: false },
      { formula: "Br2", correct: false },
    ],
  },
  {
    id: 5,
    formula: "CH3CH=CH2 + HBr → _____",
    classification: "product_missing",
    difficulty: "easy",
    choices: [
      { formula: "CH3CHBrCH3", correct: true },
      { formula: "CH2BrCH2CH3", correct: false },
      { formula: "CH3CH2CH2OH", correct: false },
      { formula: "CH3CH2CH3", correct: false },
    ],
  },
  {
    id: 6,
    formula: "CH2=CH2 + Br2 + _____ → CH2BrCH2Br",
    classification: "solvent_missing",
    difficulty: "easy",
    choices: [
      { formula: "CCl4", correct: true },
      { formula: "H2O", correct: false },
      { formula: "CH3OH", correct: false },
      { formula: "NaOH", correct: false },
    ],
  },
  {
    id: 7,
    formula: "C6H6 + _____ + H2SO4 → C6H5NO2 + H2O",
    classification: "reactant_missing",
    difficulty: "medium",
    choices: [
      { formula: "HNO3", correct: true },
      { formula: "HCl", correct: false },
      { formula: "NaNO3", correct: false },
      { formula: "Br2", correct: false },
    ],
  },
  {
    id: 8,
    formula: "CH3CH2Br + KOH → _____ + KBr",
    classification: "product_missing",
    difficulty: "medium",
    choices: [
      { formula: "CH3CH2OH", correct: true },
      { formula: "CH2=CH2", correct: false },
      { formula: "CH3CH3", correct: false },
      { formula: "CH3CHO", correct: false },
    ],
  },
  {
    id: 9,
    formula: "CH3CH=CH2 + KMnO4 + _____ → CH3CHOHCH2OH",
    classification: "solvent_missing",
    difficulty: "hard",
    choices: [
      { formula: "H2O", correct: true },
      { formula: "CCl4", correct: false },
      { formula: "CH2Cl2", correct: false },
      { formula: "CH3OH", correct: false },
    ],
  },
];

export async function GET() {
  return NextResponse.json(questions);
}
