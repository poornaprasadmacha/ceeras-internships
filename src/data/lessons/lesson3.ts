import { LessonDefinition } from '../../types/lesson';
import { patientsDataset } from '../datasets/patients';

export const lesson3: LessonDefinition = {
  id: 'lesson_3',
  number: 3,
  slug: 'text-constraints',
  title: 'Queries with Text Constraints',
  shortDescription:
    'Filter string data using pattern matching with LIKE, wildcards (%, _), and multi-value membership with IN and NOT IN.',
  estimatedMinutes: 10,
  learningObjectives: [
    'Use the LIKE operator for pattern-matching text queries.',
    'Understand wildcards: % matches any sequence, _ matches a single character.',
    'Match multiple possible string values cleanly using IN (...).',
    'Exclude unwanted values using NOT IN and NOT LIKE.',
  ],
  prerequisites: ['Basic SELECT and numerical WHERE constraints.'],
  dataset: patientsDataset,
  sections: [
    {
      id: 'section-like-wildcards',
      title: 'A. Pattern Matching with LIKE and Wildcards',
      content: `When searching text columns, exact equality (=) is often too rigid. SQL provides the **LIKE** operator alongside pattern wildcards:

• **% (Percent sign)**: Matches zero or more arbitrary characters.
  - \`'Cardio%'\` matches *"Cardiology"*, *"Cardiopulmonary"*, or *"Cardio"*.
  - \`'%itis'\` matches any word ending in *"itis"* (e.g., *"Bronchitis"*, *"Arthritis"*).
• **_ (Underscore)**: Matches exactly one character.
  - \`'H_t'\` matches *"Hot"*, *"Hat"*, or *"Hit"*, but not *"Heat"*.`,
      codeExample: {
        sql: `SELECT first_name, last_name, medical_condition\nFROM HospitalPatients\nWHERE medical_condition LIKE '%itis';`,
        explanation: 'Retrieves all patients whose medical condition diagnosis ends with "itis".',
      },
    },
    {
      id: 'section-in-operator',
      title: 'B. Exact Multiple Matches with IN and NOT IN',
      content: `Instead of stringing together multiple verbose **OR** conditions, the **IN** operator tests whether a value exists within a comma-separated list:

• **IN ('A', 'B', 'C')**: Evaluates to true if the column matches any listed value.
• **NOT IN ('A', 'B')**: Evaluates to true only if the column does NOT match any listed item.`,
      codeExample: {
        sql: `SELECT first_name, department\nFROM HospitalPatients\nWHERE department IN ('Cardiology', 'Neurology');`,
        explanation: 'Finds patients assigned to either Cardiology or Neurology in a concise statement.',
      },
    },
  ],
  exercises: [
    {
      id: 'ex_3_1',
      lessonId: 'lesson_3',
      order: 1,
      title: 'Exercise 1: Find Conditions Ending with "itis"',
      objective: 'Write a query to retrieve all columns for patients whose medical_condition ends with the letters "itis".',
      initialQuery: 'SELECT * FROM HospitalPatients WHERE',
      solutionQuery: "SELECT * FROM HospitalPatients WHERE medical_condition LIKE '%itis';",
      hint: "Use LIKE with '%itis'. The percent wildcard matches any leading text.",
      explanation: "medical_condition LIKE '%itis' matches 'Acute Bronchitis'.",
      expectedColumns: ['id', 'first_name', 'last_name', 'medical_condition', 'department', 'admission_year'],
    },
    {
      id: 'ex_3_2',
      lessonId: 'lesson_3',
      order: 2,
      title: 'Exercise 2: Filter by Multiple Departments Using IN',
      objective: 'Select the first_name, last_name, and department of all patients in either the "Endocrinology" or "Pulmonology" department.',
      initialQuery: 'SELECT first_name, last_name, department FROM HospitalPatients WHERE',
      solutionQuery: "SELECT first_name, last_name, department FROM HospitalPatients WHERE department IN ('Endocrinology', 'Pulmonology');",
      hint: "Use department IN ('Endocrinology', 'Pulmonology').",
      explanation: "The IN operator simplifies multi-match checks over chaining OR conditions.",
      expectedColumns: ['first_name', 'last_name', 'department'],
    },
    {
      id: 'ex_3_3',
      lessonId: 'lesson_3',
      order: 3,
      title: 'Exercise 3: Match Names Starting with Specific Letters',
      objective: 'Select the first_name and last_name of all patients whose first_name starts with the letter "M".',
      initialQuery: 'SELECT first_name, last_name FROM HospitalPatients WHERE',
      solutionQuery: "SELECT first_name, last_name FROM HospitalPatients WHERE first_name LIKE 'M%';",
      hint: "Use first_name LIKE 'M%'.",
      explanation: "'M%' matches any text starting with 'M' followed by any sequence of characters.",
      expectedColumns: ['first_name', 'last_name'],
    },
    {
      id: 'ex_3_4',
      lessonId: 'lesson_3',
      order: 4,
      title: 'Exercise 4: Exclude Cardiology with NOT IN',
      objective: 'Select all columns for patients who are NOT in Cardiology.',
      initialQuery: 'SELECT * FROM HospitalPatients WHERE',
      solutionQuery: "SELECT * FROM HospitalPatients WHERE department NOT IN ('Cardiology');",
      hint: "Use department NOT IN ('Cardiology') or department != 'Cardiology'.",
      explanation: "NOT IN excludes the specified category from the query output.",
      expectedColumns: ['id', 'first_name', 'last_name', 'medical_condition', 'department', 'admission_year'],
    },
  ],
  quiz: [
    {
      id: 'q_3_1',
      question: 'Which wildcard symbol in SQL matches any sequence of zero or more characters?',
      explanation: 'In standard SQL, % matches zero or more characters, while _ matches exactly one character.',
      difficulty: 'beginner',
      topicTag: 'Concept Check',
      type: 'multiple-choice',
      options: [
        { id: 'opt_1', text: 'The question mark (?)', isCorrect: false },
        { id: 'opt_2', text: 'The percent sign (%)', isCorrect: true },
        { id: 'opt_3', text: 'The asterisk (*)', isCorrect: false },
        { id: 'opt_4', text: 'The underscore (_)', isCorrect: false },
      ],
    },
    {
      id: 'q_3_2',
      question: 'What pattern does WHERE city LIKE "B_r%" match?',
      explanation: 'The underscore matches exactly one character, and the percent matches any following characters.',
      difficulty: 'beginner',
      topicTag: 'Concept Check',
      type: 'multiple-choice',
      options: [
        { id: 'opt_1', text: 'Any city starting with B, followed by exactly one character, then r, and any remaining text.', isCorrect: true },
        { id: 'opt_2', text: 'Any city starting with B or r.', isCorrect: false },
        { id: 'opt_3', text: 'Only cities named "Bar".', isCorrect: false },
        { id: 'opt_4', text: 'Any city that does not contain the letter B.', isCorrect: false },
      ],
    },
    {
      id: 'q_3_3',
      question: 'Which clause is equivalent to checking status against Active, Pending, or Review?',
      explanation: 'The IN operator provides a cleaner, faster shorthand for multiple OR equality checks.',
      difficulty: 'beginner',
      topicTag: 'Concept Check',
      type: 'multiple-choice',
      options: [
        { id: 'opt_1', text: 'WHERE status LIKE ("Active", "Pending", "Review")', isCorrect: false },
        { id: 'opt_2', text: 'WHERE status IN ("Active", "Pending", "Review")', isCorrect: true },
        { id: 'opt_3', text: 'WHERE status BETWEEN "Active" AND "Review"', isCorrect: false },
        { id: 'opt_4', text: 'WHERE status MATCH ("Active", "Pending")', isCorrect: false },
      ],
    },
  ],
};
