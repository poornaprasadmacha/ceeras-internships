import { LessonDefinition } from '../../types/lesson';
import { flightBookingsDataset } from '../datasets/flightBookings';

export const lesson17: LessonDefinition = {
  id: 'lesson-17-case-when',
  slug: 'conditional-logic-case-when',
  number: 17,
  title: 'Conditional Logic with CASE WHEN',
  shortDescription: 'Write IF-THEN-ELSE conditional logic directly inside SQL query projections.',
  estimatedMinutes: 12,
  dataset: flightBookingsDataset,
  learningObjectives: [
    'Add conditional logic to output columns using CASE WHEN expressions',
    'Assign custom categorical labels based on numeric threshold ranges',
    'Provide fallback default values using the optional ELSE clause',
  ],
  prerequisites: ['Basic SELECT queries and boolean comparison operators.'],
  sections: [
    {
      id: 'case-when-anatomy',
      title: 'The Anatomy of CASE Expressions',
      content: `SQL is declarative, but you often need conditional branching similar to IF-ELSE in programming.

The \`CASE\` expression evaluates conditions in sequence and returns the first value where the condition is true:

• **CASE**: Begins the conditional expression
• **WHEN condition THEN value**: Tests a boolean condition and supplies result
• **ELSE default_value**: Fallback when no WHEN condition matches
• **END**: Terminates the expression
• **AS alias**: Renames the resulting calculated column`,
      codeExample: {
        sql: `SELECT passenger_name, ticket_price,\n  CASE\n    WHEN ticket_price > 1000 THEN 'Premium Tier'\n    WHEN ticket_price > 500 THEN 'Mid Tier'\n    ELSE 'Standard Tier'\n  END AS fare_category\nFROM FlightBookings;`,
        explanation: 'Evaluates each ticket price and dynamically classifies passengers into fare categories.',
      },
    },
    {
      id: 'case-when-in-select',
      title: 'Using CASE to Standardize or Recode Data',
      content: `CASE expressions are essential for transforming raw codes into readable business descriptions:

• Map single-letter status codes ('C', 'P') to human words ('Confirmed', 'Pending')
• Group continuous values into discrete buckets (e.g. pricing, age groups, grades)
• Works anywhere expressions are allowed: SELECT, WHERE, and ORDER BY`,
      codeExample: {
        sql: `SELECT flight_number, passenger_name,\n  CASE status\n    WHEN 'Confirmed' THEN 'Seat Assigned'\n    WHEN 'Pending' THEN 'Awaiting Payment'\n    ELSE 'Seat Released'\n  END AS booking_status\nFROM FlightBookings;`,
        explanation: 'Standardizes technical booking statuses into user-friendly passenger notifications.',
      },
    },
  ],
  exercises: [
    {
      id: 'ex-17-1',
      lessonId: 'lesson-17-case-when',
      order: 1,
      title: 'Task 1: Categorize Ticket Fares',
      objective: 'Select passenger_name, ticket_price, and a CASE expression aliased as price_tier that outputs "High" when ticket_price >= 800, and "Regular" otherwise.',
      initialQuery: 'SELECT passenger_name, ticket_price,\n  -- Write CASE expression here\nFROM FlightBookings;',
      solutionQuery: "SELECT passenger_name, ticket_price, CASE WHEN ticket_price >= 800 THEN 'High' ELSE 'Regular' END AS price_tier FROM FlightBookings;",
      hint: 'Use: CASE WHEN ticket_price >= 800 THEN \'High\' ELSE \'Regular\' END AS price_tier',
      explanation: 'CASE WHEN evaluates the price threshold and aliases the resulting category as price_tier.',
      expectedColumns: ['passenger_name', 'ticket_price', 'price_tier'],
      requiresOrder: false,
    },
    {
      id: 'ex-17-2',
      lessonId: 'lesson-17-case-when',
      order: 2,
      title: 'Task 2: Flag Confirmed First Class Travelers',
      objective: 'Select flight_number, passenger_name, and a CASE expression aliased as vip_alert that returns "VIP Active" when seat_class = "First" AND status = "Confirmed", else "Standard".',
      initialQuery: 'SELECT flight_number, passenger_name,\n  -- Write multi-condition CASE here\nFROM FlightBookings;',
      solutionQuery: "SELECT flight_number, passenger_name, CASE WHEN seat_class = 'First' AND status = 'Confirmed' THEN 'VIP Active' ELSE 'Standard' END AS vip_alert FROM FlightBookings;",
      hint: 'Combine conditions using AND inside WHEN: WHEN seat_class = \'First\' AND status = \'Confirmed\' THEN \'VIP Active\'',
      explanation: 'Compound boolean conditions inside WHEN clauses allow multi-factor classification.',
      expectedColumns: ['flight_number', 'passenger_name', 'vip_alert'],
      requiresOrder: false,
    },
  ],
  quiz: [
    {
      id: 'q-17-1',
      question: 'What happens if no WHEN condition matches and there is no ELSE clause in a CASE expression?',
      explanation: 'If no condition matches and no ELSE clause is provided, SQL returns NULL as the default fallback.',
      difficulty: 'intermediate',
      topicTag: 'case-when',
      type: 'multiple-choice',
      options: [
        { id: 'opt-a', text: 'SQLite throws a syntax error', isCorrect: false },
        { id: 'opt-b', text: 'The expression returns NULL', isCorrect: true },
        { id: 'opt-c', text: 'The query returns empty string', isCorrect: false },
        { id: 'opt-d', text: 'The row is omitted from results', isCorrect: false },
      ],
    },
    {
      id: 'q-17-2',
      question: 'Which keyword is strictly required to close a CASE expression?',
      explanation: 'Every CASE expression must be explicitly concluded with the END keyword.',
      difficulty: 'intermediate',
      topicTag: 'case-when',
      type: 'multiple-choice',
      options: [
        { id: 'opt-a', text: 'STOP', isCorrect: false },
        { id: 'opt-b', text: 'CLOSE', isCorrect: false },
        { id: 'opt-c', text: 'FINISH', isCorrect: false },
        { id: 'opt-d', text: 'END', isCorrect: true },
      ],
    },
  ],
};
