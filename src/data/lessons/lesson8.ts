import { LessonDefinition } from '../../types/lesson';
import { fleetVehiclesDataset } from '../datasets/fleetVehicles';

export const lesson8: LessonDefinition = {
  id: 'lesson_8',
  number: 8,
  slug: 'expressions-and-aliases',
  title: 'Queries with Expressions and Aliases',
  shortDescription:
    'Compute new dynamic columns on the fly using mathematical arithmetic (+, -, *, /) and assign readable column names using AS.',
  estimatedMinutes: 12,
  learningObjectives: [
    'Write arithmetic expressions (+, -, *, /) directly inside the SELECT clause.',
    'Assign clear, student-friendly column aliases using the AS keyword.',
    'Combine string columns with concatenation.',
    'Filter computed expressions using WHERE.',
  ],
  prerequisites: ['Basic SELECT queries.'],
  dataset: fleetVehiclesDataset,
  sections: [
    {
      id: 'section-expressions-as',
      title: 'A. Computing Values on the Fly with AS',
      content: `SQL can perform arithmetic on numbers in every row. For example, multiplying **tank_gallons** by **miles_per_gallon** calculates the vehicle's total estimated range:

\`\`\`sql
SELECT model_name, tank_gallons * miles_per_gallon AS total_range_miles
FROM FleetVehicles;
\`\`\`

The **AS** keyword renames the resulting calculation so your query output has an intuitive header instead of a raw formula.`,
      codeExample: {
        sql: `SELECT model_name, daily_rate_dollars * 7 AS weekly_rental_cost\nFROM FleetVehicles;`,
        explanation: 'Multiplies daily rate by 7 to project the total weekly rental price.',
      },
    },
  ],
  exercises: [
    {
      id: 'ex_8_1',
      lessonId: 'lesson_8',
      order: 1,
      title: 'Exercise 1: Calculate Maximum Driving Range',
      objective: 'Select model_name and calculate the maximum range in miles by multiplying tank_gallons by miles_per_gallon. Name the calculated column total_range.',
      initialQuery: 'SELECT model_name, FROM FleetVehicles;',
      solutionQuery: 'SELECT model_name, tank_gallons * miles_per_gallon AS total_range FROM FleetVehicles;',
      hint: 'Multiply tank_gallons * miles_per_gallon AS total_range.',
      explanation: 'Expressions compute per-row values dynamically during query execution.',
      expectedColumns: ['model_name', 'total_range'],
    },
    {
      id: 'ex_8_2',
      lessonId: 'lesson_8',
      order: 2,
      title: 'Exercise 2: Calculate 3-Day Rental Total',
      objective: 'Select model_name, vehicle_type, and compute the cost for a 3-day rental (daily_rate_dollars * 3) aliased as rental_three_days.',
      initialQuery: 'SELECT model_name, vehicle_type, FROM FleetVehicles;',
      solutionQuery: 'SELECT model_name, vehicle_type, daily_rate_dollars * 3 AS rental_three_days FROM FleetVehicles;',
      hint: 'Multiply daily_rate_dollars * 3 AS rental_three_days.',
      explanation: 'Aliases rename formula outputs for clean, student-friendly display.',
      expectedColumns: ['model_name', 'vehicle_type', 'rental_three_days'],
    },
  ],
  quiz: [
        {
      id: 'q_8_1',
      question: 'What is the purpose of the AS keyword in the SELECT clause?',
      explanation: 'AS creates a temporary alias for the column in the returned result set; it does not change the disk schema.',
      difficulty: 'beginner',
      topicTag: 'Concept Check',
      type: 'multiple-choice',
      options: [
        { id: 'opt_1', text: 'To sort the output automatically.', isCorrect: false },
        { id: 'opt_2', text: 'To assign a custom, descriptive name (alias) to a column or calculated expression.', isCorrect: true },
        { id: 'opt_3', text: 'To convert a string into a number.', isCorrect: false },
        { id: 'opt_4', text: 'To permanently alter the schema of the underlying database table.', isCorrect: false }
      ],
    },
  ],
};
