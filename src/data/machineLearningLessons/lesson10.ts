import { MLLessonDefinition } from '../../types/machineLearningLesson';

export const mlLesson10: MLLessonDefinition = {
  id: 'ml-lesson-10',
  number: 10,
  slug: 'random-forests-and-bagging',
  title: 'Ensemble Methods: Bagging & Random Forests',
  shortDescription: 'Harness the wisdom of crowds: reduce variance and eliminate overfitting by combining diverse decision trees with Bootstrap Aggregation and Random Forests.',
  estimatedMinutes: 12,
  learningObjectives: [
    'Explain the ensemble philosophy: combining diverse weak learners into a high-performance model',
    'Understand Bootstrap Aggregation (Bagging) with replacement and Out-of-Bag (OOB) validation',
    'Describe how Random Forests decorrelate individual trees using random feature subspace sampling',
  ],
  prerequisites: ['Decision Trees & Information Gain'],
  sections: [
    {
      id: 'sec-ml-10-1',
      title: 'The Ensemble Philosophy',
      content: `A single decision tree is notorious for **high variance**: small changes in training data produce wildly different split hierarchies.

**Ensemble Learning** combines predictions from multiple individual models (base estimators) to achieve lower variance and higher generalization than any single estimator could produce alone.

Core rule: The individual estimators must be **diverse** and have errors that are relatively uncorrelated.`,
    },
    {
      id: 'sec-ml-10-2',
      title: 'Bootstrap Aggregation (Bagging)',
      content: `**Bagging (Bootstrap Aggregating)**:
1. **Bootstrapping**: Given dataset of size $n$, sample $n$ observations **with replacement** to train each tree.
   • Mathematically, roughly $63.2\\%$ of unique observations are included in each bootstrap sample.
   • The remaining $\\approx 36.8\\%$ are **Out-of-Bag (OOB)** samples, providing a built-in validation test!
2. **Aggregating**:
   • Classification: Majority vote across all trees.
   • Regression: Arithmetic average of all predictions.`,
    },
    {
      id: 'sec-ml-10-3',
      title: 'Random Forests: Decorrelating Trees',
      content: `Standard Bagging has a flaw: if one feature is extremely dominant (e.g. Income in credit scoring), almost every bagged tree will select that feature for its root split, producing highly correlated trees.

**Random Forests** introduce a crucial innovation:
At *every split*, the algorithm is only allowed to choose from a **random subset of features** (typically $\\sqrt{m}$ for classification, $m/3$ for regression).

This forces trees to explore alternative pathways, dramatically **decorrelating the ensemble** and slashing overall variance!`,
    },
  ],
  exercises: [
    {
      id: 'ml-ex-10-1',
      lessonId: 'ml-lesson-10',
      order: 1,
      title: 'Compute Ensemble Majority Vote from 5 Trees',
      objective: 'Given individual predictions from 5 diverse decision trees: [1, 0, 1, 1, 0], compute the majority vote and print the final ensemble prediction.',
      initialCode: `const treeVotes = [1, 0, 1, 1, 0];

// 1. Count votes for class 1 and class 0
// 2. Determine majority vote (winner)
// 3. Print "Ensemble prediction:" followed by majority vote

`,
      solutionCode: `const treeVotes = [1, 0, 1, 1, 0];
const ones = treeVotes.filter(v => v === 1).length;
const zeros = treeVotes.filter(v => v === 0).length;
const ensemblePred = ones > zeros ? 1 : 0;
console.log("Ensemble prediction:", ensemblePred);`,
      expectedOutput: `Ensemble prediction: 1`,
      hint: '3 trees voted 1 and 2 trees voted 0. The majority vote is 1.',
      explanation: 'With 3 votes for 1 and 2 votes for 0, the Random Forest ensemble predicts class 1.',
      quickChips: [
        'const ones = treeVotes.filter(v => v === 1).length;',
        'const zeros = treeVotes.filter(v => v === 0).length;',
        'console.log("Ensemble prediction:", ones > zeros ? 1 : 0);',
      ],
    },
  ],
  quiz: [
    {
      id: 'q-ml-10-1',
      question: 'What is the primary mechanism by which Random Forests prevent individual trees from being highly correlated?',
      explanation: 'At every split, Random Forests restrict the candidate split features to a random subset (typically sqrt(m)), preventing a single dominant feature from dictating every tree.',
      difficulty: 'intermediate',
      topicTag: 'data-science',
      type: 'multiple-choice',
      options: [
        { id: 'opt-a', text: 'Considering only a random subset of features at each split', isCorrect: true },
        { id: 'opt-b', text: 'Using only a single training sample per tree', isCorrect: false },
        { id: 'opt-c', text: 'Forcing all trees to have identical depths', isCorrect: false },
        { id: 'opt-d', text: 'Inverting all negative numbers to positive', isCorrect: false },
      ],
    },
    {
      id: 'q-ml-10-2',
      question: 'In Bootstrap sampling with replacement from a dataset of size n, approximately what percentage of samples are left out (Out-of-Bag)?',
      explanation: 'As n grows, (1 - 1/n)^n converges to 1/e, which is approximately 36.8% (commonly cited as ~37%).',
      difficulty: 'advanced',
      topicTag: 'data-science',
      type: 'multiple-choice',
      options: [
        { id: 'opt-a', text: 'Approximately 36.8%', isCorrect: true },
        { id: 'opt-b', text: '0% (all samples are included)', isCorrect: false },
        { id: 'opt-c', text: '75%', isCorrect: false },
        { id: 'opt-d', text: '50% exactly', isCorrect: false },
      ],
    },
    {
      id: 'q-ml-10-3',
      question: 'How does an ensemble of decision trees (Random Forest) affect the Bias-Variance tradeoff compared to a single deep decision tree?',
      explanation: 'Averaging predictions across diverse low-bias trees significantly reduces variance without increasing bias.',
      difficulty: 'intermediate',
      topicTag: 'data-science',
      type: 'multiple-choice',
      options: [
        { id: 'opt-a', text: 'It drastically reduces variance while maintaining low bias', isCorrect: true },
        { id: 'opt-b', text: 'It increases variance to infinity', isCorrect: false },
        { id: 'opt-c', text: 'It converts the model into linear regression', isCorrect: false },
        { id: 'opt-d', text: 'It eliminates the need for any features', isCorrect: false },
      ],
    },
  ],
};
