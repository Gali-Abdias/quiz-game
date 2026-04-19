import * as readline from "readline";

// --- Types ---
interface Question {
  question: string;
  options: [string, string, string, string];
  answer: 0 | 1 | 2 | 3;
}

interface Result {
  question: string;
  correct: boolean;
  chosen: string;
  expected: string;
}
// --- Quiz Data ---
const questions: Question[] = [
  {
    question: "What does 'TS' stand for in TypeScript?",
    options: ["Type System", "TypeScript", "Typed Script", "Text Style"],
    answer: 1,
  },
  {
    question: "Which company developed TypeScript?",
    options: ["Google", "Meta", "Microsoft", "Apple"],
    answer: 2,
  },
  {
    question: "What is the file extension for TypeScript files?",
    options: [".js", ".tsx", ".ts", ".tp"],
    answer: 2,
  },
  {
    question: "Which keyword declares a constant in TypeScript?",
    options: ["var", "let", "const", "fixed"],
    answer: 2,
  },
  {
    question: "What does TypeScript compile to?",
    options: ["Python", "Java", "Binary", "JavaScript"],
    answer: 3,
  },
];