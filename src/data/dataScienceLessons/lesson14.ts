import { DataScienceLessonDefinition } from '../../types/dataScienceLesson';

export const dsLesson14: DataScienceLessonDefinition = {
  id: 'ds-lesson-14',
  number: 14,
  slug: 'classification-and-model-evaluation',
  title: 'Machine Learning: Classification & Evaluation',
  shortDescription: 'Evaluate classification models beyond naive accuracy using the Confusion Matrix, Precision, Recall, and the harmonic F1-Score.',
  estimatedMinutes: 14,
  learningObjectives: [
    'Distinguish classification problems (discrete categories) from regression (continuous numbers)',
    'Construct and interpret a 2x2 Confusion Matrix (TP, FP, TN, FN)',
    'Compute Precision, Recall, and F1-Score to evaluate performance on imbalanced datasets',
  ],
  prerequisites: ['Machine Learning: Simple Linear Regression'],
  sections: [
    {
      id: 'sec-14-1',
      title: 'Classification vs. Regression',
      content: `While regression predicts continuous values (e.g. house price or temperature), **classification** predicts discrete class labels:
• Binary: Spam vs. Not Spam, Fraud vs. Legitimate, Malignant vs. Benign.
• Multiclass: Image recognition (Cat, Dog, Bird, Car).

In imbalanced datasets (e.g. credit fraud where 99.8% of transactions are legitimate), **raw accuracy is deceptive**: a naive model that predicts "Legitimate" for everything achieves 99.8% accuracy while failing 100% of frauds!`,
    },
    {
      id: 'sec-14-2',
      title: 'The Confusion Matrix',
      content: `A **Confusion Matrix** maps predictions against actual ground-truth outcomes:

| | Predicted Positive | Predicted Negative |
|---|---|---|
| **Actual Positive** | **True Positive (TP)** | **False Negative (FN)** *(Type II error)* |
| **Actual Negative** | **False Positive (FP)** *(Type I error)* | **True Negative (TN)** |

• **TP**: Caught positive cases (e.g. flagged actual fraud).
• **FP**: False alarms (e.g. flagged normal transaction as fraud).
• **FN**: Missed cases (e.g. missed real fraud - dangerous in medicine/security).
• **TN**: Correctly identified normal cases.`,
    },
    {
      id: 'sec-14-3',
      title: 'Precision, Recall, and F1-Score',
      content: `• **Precision**: When the model predicts positive, how often is it right?
$$\\text{Precision} = \\frac{TP}{TP + FP}$$

• **Recall (Sensitivity)**: Out of all actual positives, how many did the model capture?
$$\\text{Recall} = \\frac{TP}{TP + FN}$$

• **F1-Score**: The harmonic mean balancing precision and recall:
$$F_1 = 2 \\times \\frac{\\text{Precision} \\times \\text{Recall}}{\\text{Precision} + \\text{Recall}}$$
The harmonic mean punishes extreme imbalances between precision and recall, providing an honest single benchmark.`,
    },
  ],
  exercises: [
    {
      id: 'ds-ex-14-1',
      lessonId: 'ds-lesson-14',
      order: 1,
      title: 'Calculate Precision, Recall, and F1-Score for Fraud Classifier',
      objective: 'Given TP = 80, FP = 20, and FN = 10 from model evaluation test runs, calculate Precision (TP / (TP + FP)), Recall (TP / (TP + FN)), and F1-Score.',
      dataset: {
        name: 'model_evaluation_metrics.csv',
        columns: ['metric', 'count'],
        rows: [
          ['TP', 80],
          ['FP', 20],
          ['FN', 10],
          ['TN', 90],
        ],
        description: 'Test set confusion matrix counts for credit card fraud classifier',
      },
      initialCode: `// Given:
const TP = 80;
const FP = 20;
const FN = 10;

// 1. Calculate Precision: TP / (TP + FP)
// 2. Calculate Recall: TP / (TP + FN)
// 3. Calculate F1: 2 * (Precision * Recall) / (Precision + Recall)
// Print "Precision:", Number(precision.toFixed(2))
// Print "Recall:", Number(recall.toFixed(2))
// Print "F1:", Number(f1.toFixed(2))

`,
      solutionCode: `const TP = 80;
const FP = 20;
const FN = 10;
const precision = TP / (TP + FP);
const recall = TP / (TP + FN);
const f1 = (2 * precision * recall) / (precision + recall);
console.log("Precision:", Number(precision.toFixed(2)));
console.log("Recall:", Number(recall.toFixed(2)));
console.log("F1:", Number(f1.toFixed(2)));`,
      expectedOutput: `Precision: 0.8
Recall: 0.89
F1: 0.84`,
      hint: 'Precision = 80/100 = 0.80. Recall = 80/90 = 0.89. F1 = 2 * (0.8 * 0.8889) / (0.8 + 0.8889) = 0.84.',
      explanation: 'Precision is 0.80 (80% of flagged transactions were actual fraud), Recall is 0.89 (89% of all frauds were caught), and F1 is 0.84.',
      quickChips: [
        'const precision = TP / (TP + FP);',
        'const recall = TP / (TP + FN);',
        'const f1 = (2 * precision * recall) / (precision + recall);',
        'console.log("Precision:", Number(precision.toFixed(2)));',
      ],
    },
  ],
  quiz: [
    {
      id: 'q-ds-14-1',
      question: 'In medical diagnosis for a rare life-threatening illness, why is high RECALL usually prioritized over high precision?',
      explanation: 'A false negative (missing a sick patient) can be fatal, so we prioritize catching every true case (high recall) even if some healthy patients get false alarm re-tests.',
      difficulty: 'intermediate',
      topicTag: 'data-science',
      type: 'multiple-choice',
      options: [
        { id: 'opt-a', text: 'Missing a sick patient (False Negative) has devastating consequences, so catching all cases is critical', isCorrect: true },
        { id: 'opt-b', text: 'Recall takes less computational memory to compute', isCorrect: false },
        { id: 'opt-c', text: 'Doctors do not understand percentages', isCorrect: false },
        { id: 'opt-d', text: 'Precision is only defined for financial datasets', isCorrect: false },
      ],
    },
    {
      id: 'q-ds-14-2',
      question: 'Why does the F1-Score use the Harmonic Mean rather than the simple arithmetic average of precision and recall?',
      explanation: 'The harmonic mean gives much greater weight to low values, preventing a model with 100% precision and 1% recall from reporting an inflated score.',
      difficulty: 'advanced',
      topicTag: 'data-science',
      type: 'multiple-choice',
      options: [
        { id: 'opt-a', text: 'It penalizes extreme disparities, preventing an inflated score if one metric is near zero', isCorrect: true },
        { id: 'opt-b', text: 'Harmonic means are always equal to 1.0', isCorrect: false },
        { id: 'opt-c', text: 'Arithmetic means cannot be used with floating point numbers', isCorrect: false },
        { id: 'opt-d', text: 'To ensure the score is always negative', isCorrect: false },
      ],
    },
    {
      id: 'q-ds-14-3',
      question: 'What constitutes a False Positive (Type I error) in an automated email spam filter?',
      explanation: 'A legitimate non-spam email mistakenly flagged and sent to the Spam quarantine folder.',
      difficulty: 'beginner',
      topicTag: 'data-science',
      type: 'multiple-choice',
      options: [
        { id: 'opt-a', text: 'An important, legitimate email mistakenly moved to the spam folder', isCorrect: true },
        { id: 'opt-b', text: 'A spam email that slipped into the primary inbox', isCorrect: false },
        { id: 'opt-c', text: 'A spam email correctly filtered into spam', isCorrect: false },
        { id: 'opt-d', text: 'An email that bounces due to server failure', isCorrect: false },
      ],
    },
    {
      id: 'q_datascience_14_auto_4',
      question: "What is the primary objective of Exploratory Data Analysis (EDA) in Data Science?",
      explanation: "EDA uses summary statistics and visualization to uncover underlying structure and test hypotheses.",
      difficulty: 'intermediate',
      topicTag: 'datascience',
      type: 'multiple-choice',
      options: [
        { id: 'opt_1', text: "Understanding data distributions, patterns, anomalies, and relationships before formal modeling", isCorrect: true },
        { id: 'opt_2', text: "Deploying deep learning models to production clusters", isCorrect: false },
        { id: 'opt_3', text: "Encrypting user passwords", isCorrect: false },
        { id: 'opt_4', text: "Writing low-level hardware device drivers", isCorrect: false },
      ],
    },
    {
      id: 'q_datascience_14_auto_5',
      question: "What is the difference between Mean and Median in skewed distributions?",
      explanation: "Outliers pull the mean toward the tail, making the median a more representative measure of central tendency.",
      difficulty: 'intermediate',
      topicTag: 'datascience',
      type: 'multiple-choice',
      options: [
        { id: 'opt_1', text: "The mean is sensitive to extreme outliers, while the median represents the 50th percentile robustly", isCorrect: true },
        { id: 'opt_2', text: "The median is always larger than the mean", isCorrect: false },
        { id: 'opt_3', text: "The mean only applies to categorical data", isCorrect: false },
        { id: 'opt_4', text: "There is no difference in skewed distributions", isCorrect: false },
      ],
    },
    {
      id: 'q_datascience_14_auto_6',
      question: "What does a p-value less than 0.05 indicate in a standard hypothesis test?",
      explanation: "A p-value below alpha (0.05) indicates that observed results are unlikely under the null hypothesis.",
      difficulty: 'intermediate',
      topicTag: 'datascience',
      type: 'multiple-choice',
      options: [
        { id: 'opt_1', text: "Strong evidence against the null hypothesis, rejecting the null in favor of statistical significance", isCorrect: true },
        { id: 'opt_2', text: "The test was flawed and must be re-run", isCorrect: false },
        { id: 'opt_3', text: "A 5% probability that the null hypothesis is true", isCorrect: false },
        { id: 'opt_4', text: "The data follows a uniform distribution", isCorrect: false },
      ],
    },
    {
      id: 'q_datascience_14_auto_7',
      question: "What does the Pearson correlation coefficient (r) measure?",
      explanation: "Pearson's r ranges from -1 (perfect negative linear correlation) to +1 (perfect positive linear correlation).",
      difficulty: 'intermediate',
      topicTag: 'datascience',
      type: 'multiple-choice',
      options: [
        { id: 'opt_1', text: "The strength and direction of a linear relationship between two continuous variables (-1 to +1)", isCorrect: true },
        { id: 'opt_2', text: "The non-linear curve between categorical labels", isCorrect: false },
        { id: 'opt_3', text: "The probability of an error", isCorrect: false },
        { id: 'opt_4', text: "The variance of the dependent variable", isCorrect: false },
      ],
    },
    {
      id: 'q_datascience_14_auto_8',
      question: "What is the purpose of feature scaling (e.g. Standardisation or Min-Max Normalisation)?",
      explanation: "Scaling prevents features with large numeric scales from dominating distance calculations (KNN, SVM, Gradient Descent).",
      difficulty: 'intermediate',
      topicTag: 'datascience',
      type: 'multiple-choice',
      options: [
        { id: 'opt_1', text: "To bring numerical features to a comparable scale so gradient descent and distance-based algorithms converge efficiently", isCorrect: true },
        { id: 'opt_2', text: "To convert negative numbers to positive numbers", isCorrect: false },
        { id: 'opt_3', text: "To remove missing values", isCorrect: false },
        { id: 'opt_4', text: "To increase the number of columns", isCorrect: false },
      ],
    },
    {
      id: 'q_datascience_14_auto_9',
      question: "What does the R-squared (coefficient of determination) metric represent in regression?",
      explanation: "R-squared indicates the percentage of target variance explained by the regression model (0 to 1).",
      difficulty: 'intermediate',
      topicTag: 'datascience',
      type: 'multiple-choice',
      options: [
        { id: 'opt_1', text: "The proportion of variance in the dependent variable that is predictable from the independent variables", isCorrect: true },
        { id: 'opt_2', text: "The absolute difference between predictions and labels", isCorrect: false },
        { id: 'opt_3', text: "The percentage of missing values", isCorrect: false },
        { id: 'opt_4', text: "The learning rate of the model", isCorrect: false },
      ],
    },
    {
      id: 'q_datascience_14_auto_10',
      question: "What is the Central Limit Theorem?",
      explanation: "The CLT establishes that sample averages approximate a Gaussian bell curve given sufficient sample size (n >= 30).",
      difficulty: 'intermediate',
      topicTag: 'datascience',
      type: 'multiple-choice',
      options: [
        { id: 'opt_1', text: "The sampling distribution of the sample mean approaches a normal distribution as sample size increases, regardless of population distribution", isCorrect: true },
        { id: 'opt_2', text: "All data in nature is normally distributed", isCorrect: false },
        { id: 'opt_3', text: "The mean of any dataset equals the median", isCorrect: false },
        { id: 'opt_4', text: "Sample sizes must always exceed 1,000,000", isCorrect: false },
      ],
    },
  ],
};
