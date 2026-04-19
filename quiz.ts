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
// --- Helpers ---
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function ask(prompt: string): Promise<string> {
  return new Promise((resolve) => rl.question(prompt, resolve));
}

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// --- Game Logic ---
async function runQuiz(): Promise<void> {
  console.log("\n🧠 Welcome to the TypeScript Quiz!\n");
  console.log("Answer each question by typing 1, 2, 3, or 4.\n");
  await sleep(800);

  const results: Result[] = [];

  for (let i = 0; i < questions.length; i++) {
    const q = questions[i];
    console.log(`\nQ${i + 1}: ${q.question}`);
    q.options.forEach((opt, idx) => console.log(`  ${idx + 1}. ${opt}`));

    let input: string;
    let choice: number;

    while (true) {
      input = await ask("\nYour answer (1-4): ");
      choice = parseInt(input.trim());
      if (choice >= 1 && choice <= 4) break;
      console.log("⚠️  Please enter a number between 1 and 4.");
    }

    const chosenIndex = (choice - 1) as 0 | 1 | 2 | 3;
    const correct = chosenIndex === q.answer;

    console.log(correct ? "✅ Correct!" : `❌ Wrong! Answer: ${q.options[q.answer]}`);

    results.push({
      question: q.question,
      correct,
      chosen: q.options[chosenIndex],
      expected: q.options[q.answer],
    });

    await sleep(500);
  }
  // --- Summary ---
    const score = results.filter((r) => r.correct).length;
    const total = questions.length;
    const percent = Math.round((score / total) * 100);

    console.log("\n=============================");
    console.log(`🏁 Quiz Complete! Score: ${score}/${total} (${percent}%)`);

    if (percent === 100) console.log("🏆 Perfect score! You're a TypeScript pro!");
    else if (percent >= 60) console.log("👍 Good job! Keep learning!");
    else console.log("📚 Keep practicing, you'll get there!");

    console.log("=============================\n");

    rl.close();
  }

  // --- Run ---
  runQuiz();
