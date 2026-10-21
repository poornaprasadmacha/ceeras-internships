# QueryPath — Lesson Authoring Guide

This guide establishes the standards, schema requirements, and verification protocols for creating and registering lessons in QueryPath.

---

## 1. Core Principles for Lesson Authors

1. **Original Datasets**: Do not copy datasets from external courses. Create realistic, engaging, and domain-appropriate fictional tables (e.g., libraries, aviation, botanical gardens, scientific expeditions, university courses).
2. **Clear Pedagogical Structure**:
   - Short, punchy conceptual explanations (under 300 words per section).
   - Real-world motivation before introducing abstract syntax.
   - Contrast good SQL with common pitfalls (syntax errors, missing commas, wrong quotation marks).
3. **Progressive Exercises**:
   - Start with single-column queries before multiple columns.
   - Each exercise must have a clear, unambiguous prompt.
   - Provide a targeted hint that clarifies the concept without giving away the exact solution.
4. **Resilient Verification**:
   - Write reference queries that test the semantics, not exact whitespace.
   - For queries where ordering is not required, compare result sets as unordered multisets.

---

## 2. TypeScript Interfaces

Every lesson definition must adhere to `src/types/lesson.ts`:

```typescript
export interface DatasetDefinition {
  id: string;
  tableName: string;
  description: string;
  schemaDDL: string;
  seedDML: string;
  sampleColumns: string[];
  sampleRows: (string | number | null)[][];
}

export interface ExerciseDefinition {
  id: string;
  lessonId: string;
  order: number;
  title: string;
  objective: string;
  initialQuery: string;
  solutionQuery: string;
  hint: string;
  explanation: string;
  requiresOrder?: boolean;
  expectedColumns?: string[];
  acceptedAlternativeQueries?: string[];
}

export interface QuizQuestion {
  id: string;
  question: string;
  explanation: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  topicTag: string;
  type: 'multiple-choice' | 'true-false' | 'predict-output' | 'identify-error';
  options: {
    id: string;
    text: string;
    isCorrect: boolean;
  }[];
}

export interface TerminologyItem {
  id: string;
  term: string;
  definition: string;
}

export interface LessonSection {
  id: string;
  title: string;
  content: string; // Markdown / formatted text
  codeExample?: {
    sql: string;
    explanation: string;
  };
  sampleTable?: {
    title: string;
    columns: string[];
    rows: (string | number)[][];
  };
}

export interface LessonDefinition {
  id: string;
  number: number;
  slug: string;
  title: string;
  shortDescription: string;
  estimatedMinutes: number;
  learningObjectives: string[];
  prerequisites: string[];
  dataset: DatasetDefinition;
  sections: LessonSection[];
  comprehensionQuestions?: QuizQuestion[];
  terminologyMatching?: TerminologyItem[];
  exercises: ExerciseDefinition[];
  quiz: QuizQuestion[];
}
```

---

## 3. Step-by-Step: Adding a New Lesson

### Step 1: Define the Dataset
Create `src/data/datasets/<datasetName>.ts`:
```typescript
import { DatasetDefinition } from '../../types/lesson';

export const astronomyDataset: DatasetDefinition = {
  id: 'stellar_observatory',
  tableName: 'CelestialObjects',
  description: 'Catalog of observable stars and planetary nebulae',
  schemaDDL: `
    CREATE TABLE CelestialObjects (
      object_id INTEGER PRIMARY KEY,
      name TEXT NOT NULL,
      type TEXT NOT NULL,
      magnitude REAL,
      distance_light_years INTEGER
    );
  `,
  seedDML: `
    INSERT INTO CelestialObjects VALUES
      (1, 'Sirius', 'Star', -1.46, 9),
      (2, 'Betelgeuse', 'Red Supergiant', 0.50, 642),
      (3, 'Ring Nebula', 'Planetary Nebula', 8.80, 2570);
  `,
  sampleColumns: ['object_id', 'name', 'type', 'magnitude', 'distance_light_years'],
  sampleRows: [
    [1, 'Sirius', 'Star', -1.46, 9],
    [2, 'Betelgeuse', 'Red Supergiant', 0.50, 642],
    [3, 'Ring Nebula', 'Planetary Nebula', 8.80, 2570],
  ]
};
```

### Step 2: Define the Lesson
Create `src/data/lessons/lesson<N>.ts` implementing `LessonDefinition`.

### Step 3: Register in the Lesson Manifest
In `src/data/lessons/index.ts`:
```typescript
import { lesson1 } from './lesson1';
import { lesson2 } from './lesson2';
import { lesson3 } from './lesson3'; // future lesson

export const LESSON_MANIFEST: LessonDefinition[] = [
  lesson1,
  lesson2,
  // lesson3
];
```

The app shell, route guards, dashboard, and next/previous navigations automatically adapt to the updated manifest without any manual component edits.
