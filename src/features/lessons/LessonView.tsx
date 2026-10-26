import React, { useEffect, useState, useRef } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { getLessonBySlug, getNextLesson, getPrevLesson } from '../../data/lessons';
import { useProgress } from '../../hooks/useProgress';
import {
  ConceptBox,
  ProTipBox,
  KnowledgeCheck,
  OutputBox,
} from './TutorialCallouts';
import { EmbeddedSqlEditor } from './EmbeddedSqlEditor';
import { QuizRunner } from '../quizzes/QuizRunner';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import {
  Bookmark,
  CheckCircle2,
  Clock,
  ArrowLeft,
  ArrowRight,
  ChevronDown,
  BookOpen,
} from 'lucide-react';
import { cn } from '../../lib/utils';

export function LessonView() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();

  const lesson = getLessonBySlug(slug || '');
  const {
    lessonsProgress,
    exerciseAttempts,
    quizAttempts,
    bookmarks,
    markLessonStarted,
    recordExerciseSolved,
    recordQuizAttempt,
    toggleBookmarkItem,
  } = useProgress();

  const quizRef = useRef<HTMLDivElement>(null);

  // Sync lesson started
  useEffect(() => {
    if (lesson) {
      markLessonStarted(lesson.id);
    }
  }, [lesson?.id]);

  if (!lesson) {
    return (
      <div className="text-center py-16 space-y-4 max-w-xl mx-auto">
        <h2 className="text-xl font-bold text-gray-900">Lesson Not Found</h2>
        <p className="text-sm text-gray-600">The requested lesson does not exist in the curriculum.</p>
        <Button variant="primary" onClick={() => navigate('/learn')} className="min-h-[44px]">
          Browse All Lessons
        </Button>
      </div>
    );
  }

  const prevLesson = getPrevLesson(lesson.id);
  const nextLesson = getNextLesson(lesson.id);

  const lessonProgressRecord = lessonsProgress[lesson.id];
  const isLessonCompleted = lessonProgressRecord?.isCompleted || false;
  const isBookmarked = bookmarks.some((b) => b.lessonId === lesson.id);

  const currentQuizAttempt = quizAttempts[`quiz_${lesson.id}`];

  // Exercises
  const ex1 = lesson.exercises[0];
  const ex2 = lesson.exercises[1];
  const ex3 = lesson.exercises[2];

  const handleQuizComplete = async (
    score: number,
    total: number,
    userAnswers: Record<string, string>
  ) => {
    await recordQuizAttempt(`quiz_${lesson.id}`, score, total, userAnswers, lesson.id);
  };

  return (
    <div className="bg-white min-h-screen">
      <article className="max-w-4xl mx-auto px-4 sm:px-6 py-6 sm:py-8 font-sans text-gray-900">
        {/* Breadcrumb & Top Controls */}
        <div className="flex items-center justify-between text-xs text-gray-500 mb-4 pb-2 border-b border-gray-100">
          <div className="flex items-center gap-1.5 truncate">
            <Link to="/learn" className="hover:text-[#0066cc] font-medium">
              Course Lessons
            </Link>
            <span>/</span>
            <span className="text-gray-900 font-semibold truncate">
              Lesson {lesson.number}: {lesson.title}
            </span>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            {isLessonCompleted && (
              <span className="flex items-center gap-1 text-green-700 font-medium text-xs bg-green-50 px-2 py-0.5 rounded border border-green-200">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Completed</span>
              </span>
            )}
            <button
              type="button"
              onClick={() => toggleBookmarkItem(lesson.id, lesson.title)}
              className={cn(
                'flex items-center gap-1 px-2.5 py-1 rounded text-xs transition-colors cursor-pointer',
                isBookmarked
                  ? 'text-[#0066cc] bg-blue-50 font-semibold'
                  : 'text-gray-500 hover:text-gray-900 hover:bg-gray-100'
              )}
              title={isBookmarked ? 'Remove Bookmark' : 'Bookmark this lesson'}
            >
              <Bookmark className={cn('w-3.5 h-3.5', isBookmarked && 'fill-[#0066cc]')} />
              <span>{isBookmarked ? 'Saved' : 'Bookmark'}</span>
            </button>
          </div>
        </div>

        {/* Tutorial Title matching reference design */}
        <header className="mb-6">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight leading-snug">
            SQL Tutorial {lesson.number}: {lesson.title}
          </h1>

          <div className="flex items-center gap-3 text-xs text-gray-500 mt-2">
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" />
              <span>{lesson.estimatedMinutes} minutes</span>
            </span>
            <span>•</span>
            <span>Beginner Friendly</span>
            <span>•</span>
            <span>In-browser SQLite</span>
          </div>
        </header>

        {/* Narrative Introduction */}
        <section className="space-y-3 text-sm sm:text-base text-gray-800 leading-relaxed mb-6">
          <p>
            If spreadsheets are notebooks, a <strong>relational database</strong> is the engine. It
            allows you to store, organize, and query vast amounts of structured data in rows and
            columns, but with the speed, data integrity, and multi-user reliability required for real-world
            applications.
          </p>

          <p className="font-semibold text-gray-900 pt-1">Why use SQL?</p>
          <ul className="list-disc pl-5 space-y-1.5 text-sm sm:text-base text-gray-800">
            <li>It can filter and join millions of records in milliseconds.</li>
            <li>It guarantees transactional integrity so records are never corrupted or lost.</li>
            <li>It is the universal industry standard language across data analysis, engineering, and product teams.</li>
          </ul>
        </section>

        {/* ========================================================= */}
        {/* STEP 1: TABLES, ROWS, AND COLUMNS                        */}
        {/* ========================================================= */}
        <section className="mt-8 mb-6">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 pb-1.5 border-b-2 border-[#0066cc] mb-4">
            Step 1: Tables, Rows, and Columns
          </h2>

          <div className="space-y-3 text-sm sm:text-base text-gray-800 leading-relaxed">
            <p>
              The most fundamental object in a relational database is the <strong>Table</strong>. Think
              of it like a structured sheet in a spreadsheet: it has named columns, horizontal rows,
              and individual cells.
            </p>

            <ul className="list-disc pl-5 space-y-1 text-sm text-gray-800">
              <li>
                <strong>Table:</strong> A named grid holding all records for one specific entity (e.g.{' '}
                <code className="font-mono text-xs bg-gray-100 px-1 py-0.5 rounded text-gray-900">
                  {lesson.dataset.tableName}
                </code>
                ).
              </li>
              <li>
                <strong>Column (Attribute):</strong> A vertical specification representing one property
                (such as title or year) with an enforced data type (integer, text, date).
              </li>
              <li>
                <strong>Row (Record):</strong> A single horizontal entry representing one individual
                instance (e.g. one specific book).
              </li>
              <li>
                <strong>Cell:</strong> The unique intersection of one row and one column, holding a
                single data value.
              </li>
            </ul>

            {/* Clean Sample Output View */}
            <OutputBox
              columns={lesson.dataset.sampleColumns}
              rows={lesson.dataset.sampleRows.slice(0, 5)}
            />

            {/* Concept Box matching reference image */}
            <ConceptBox>
              Every row represents one complete item (an individual book in our catalog), and each
              column enforces a specific attribute across all items.
            </ConceptBox>

            {/* Knowledge Check 1 */}
            <KnowledgeCheck
              number={1}
              question="In the LibraryBooks table shown above, what does each individual horizontal row represent?"
              options={[
                { text: 'A single attribute, such as published_year or category.', isCorrect: false },
                { text: 'An individual book record containing all of its attributes.', isCorrect: true },
                { text: 'The entire database catalog as a whole.', isCorrect: false },
              ]}
              explanation="A row (also called a record or tuple) represents one complete instance of an entity in a relational table."
            />
          </div>
        </section>

        {/* ========================================================= */}
        {/* STEP 2: YOUR FIRST SQL QUERY                             */}
        {/* ========================================================= */}
        <section className="mt-10 mb-6">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 pb-1.5 border-b-2 border-[#0066cc] mb-4">
            Step 2: Your First SQL Query
          </h2>

          <div className="space-y-3 text-sm sm:text-base text-gray-800 leading-relaxed">
            <p>
              To read data from a table, we write a <strong>SELECT</strong> query. SQL is{' '}
              <em>declarative</em>: you tell the database <strong>what</strong> data you want, and
              the database engine plans the fastest execution path behind the scenes.
            </p>

            <p>
              The simplest and most common query uses the wildcard asterisk (<code>*</code>) to
              request every column from a table:
            </p>

            {/* Live Embedded SQL Editor #1 */}
            {ex1 && (
              <EmbeddedSqlEditor
                id={ex1.id}
                initialQuery={ex1.initialQuery}
                solutionQuery={ex1.solutionQuery}
                expectedColumns={ex1.expectedColumns}
                dataset={lesson.dataset}
                goalDescription={ex1.objective}
                hint={ex1.hint}
                explanation={ex1.explanation}
                allowedKeywords={ex1.allowedKeywords || ['SELECT', '*', 'FROM', ';']}
                isSolved={!!exerciseAttempts[ex1.id]?.isSolved}
                onSolve={(q) => recordExerciseSolved(ex1.id, lesson.id, q)}
                savedQuery={exerciseAttempts[ex1.id]?.userQuery}
              />
            )}

            {/* Pro Tip Box matching reference image */}
            <ProTipBox>
              In SQL, the asterisk (<code className="font-mono text-xs font-bold">*</code>) is a
              wildcard shorthand meaning "all columns". SQL keywords like{' '}
              <code className="font-mono text-xs font-bold">SELECT</code> and{' '}
              <code className="font-mono text-xs font-bold">FROM</code> are case-insensitive, but
              writing them in UPPERCASE is the community standard for readability.
            </ProTipBox>

            {/* Knowledge Check 2 */}
            <KnowledgeCheck
              number={2}
              question="What does the asterisk (*) symbol represent when placed directly after SELECT?"
              options={[
                { text: 'A mathematical multiplication of all table rows.', isCorrect: false },
                { text: 'A wildcard instructing the engine to return all columns defined in the table.', isCorrect: true },
                { text: 'A command to return only the first row in the table.', isCorrect: false },
              ]}
              explanation="The asterisk wildcard (*) instructs the database engine to project every column in the table without listing them individually."
            />
          </div>
        </section>

        {/* ========================================================= */}
        {/* STEP 3: SELECTING SPECIFIC COLUMNS                       */}
        {/* ========================================================= */}
        <section className="mt-10 mb-6">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 pb-1.5 border-b-2 border-[#0066cc] mb-4">
            Step 3: Selecting Specific Columns
          </h2>

          <div className="space-y-3 text-sm sm:text-base text-gray-800 leading-relaxed">
            <p>
              In real production applications, fetching all columns with <code>SELECT *</code> can
              waste bandwidth and memory when tables have dozens of columns.
            </p>

            <p>
              Instead, you specify only the attributes you need by writing comma-separated column
              names directly after the <code>SELECT</code> keyword.
            </p>

            {/* Live Embedded SQL Editor #2 */}
            {ex2 && (
              <EmbeddedSqlEditor
                id={ex2.id}
                initialQuery={ex2.initialQuery}
                solutionQuery={ex2.solutionQuery}
                expectedColumns={ex2.expectedColumns}
                dataset={lesson.dataset}
                goalDescription={ex2.objective}
                hint={ex2.hint}
                explanation={ex2.explanation}
                allowedKeywords={ex2.allowedKeywords || ['SELECT', 'FROM', ',', ';']}
                isSolved={!!exerciseAttempts[ex2.id]?.isSolved}
                onSolve={(q) => recordExerciseSolved(ex2.id, lesson.id, q)}
                savedQuery={exerciseAttempts[ex2.id]?.userQuery}
              />
            )}

            {/* Concept Box */}
            <ConceptBox>
              Selecting only the columns you need reduces network latency, minimizes memory
              consumption, and keeps output grids focused and readable.
            </ConceptBox>

            {/* Live Embedded SQL Editor #3 (Independent Challenge) */}
            {ex3 && (
              <div className="pt-2">
                <p className="text-sm font-semibold text-gray-900 mb-1">
                  Independent Challenge: Write a query from scratch
                </p>
                <p className="text-xs text-gray-600 mb-2">
                  Retrieve <code className="font-mono text-xs bg-gray-100 px-1 py-0.5 rounded">book_id</code>,{' '}
                  <code className="font-mono text-xs bg-gray-100 px-1 py-0.5 rounded">title</code>, and{' '}
                  <code className="font-mono text-xs bg-gray-100 px-1 py-0.5 rounded">category</code> from{' '}
                  <code className="font-mono text-xs bg-gray-100 px-1 py-0.5 rounded">LibraryBooks</code>.
                </p>

                <EmbeddedSqlEditor
                  id={ex3.id}
                  initialQuery={ex3.initialQuery}
                  solutionQuery={ex3.solutionQuery}
                  expectedColumns={ex3.expectedColumns}
                  dataset={lesson.dataset}
                  goalDescription={ex3.objective}
                  hint={ex3.hint}
                  explanation={ex3.explanation}
                  allowedKeywords={ex3.allowedKeywords || ['SELECT', 'FROM', ',', ';']}
                  isSolved={!!exerciseAttempts[ex3.id]?.isSolved}
                  onSolve={(q) => recordExerciseSolved(ex3.id, lesson.id, q)}
                  savedQuery={exerciseAttempts[ex3.id]?.userQuery}
                />
              </div>
            )}

            {/* Knowledge Check 3 */}
            <KnowledgeCheck
              number={3}
              question="Does the order of column names in the SELECT clause affect the output table?"
              options={[
                { text: 'No, database tables always output columns in alphabetical order.', isCorrect: false },
                { text: 'Yes, columns appear in the exact left-to-right order specified in your SELECT statement.', isCorrect: true },
                { text: 'No, the primary key column always appears first regardless of SELECT order.', isCorrect: false },
              ]}
              explanation="The database engine projects columns left-to-right in the exact order you specify in the SELECT statement."
            />
          </div>
        </section>

        {/* Optional Collapsible Section: Database Engines */}
        <div className="my-6">
          <details className="group border border-gray-200 rounded-lg bg-gray-50/70 overflow-hidden">
            <summary className="p-3.5 sm:p-4 text-xs sm:text-sm font-bold text-gray-900 cursor-pointer select-none flex items-center justify-between hover:bg-gray-100 transition-colors list-none">
              <div className="flex items-center gap-2">
                <Badge variant="outline" size="sm">Optional Reading</Badge>
                <span>Popular Relational Database Engines (SQLite, PostgreSQL, MySQL, SQL Server)</span>
              </div>
              <ChevronDown className="w-4 h-4 text-gray-500 transition-transform group-open:rotate-180" />
            </summary>
            <div className="px-4 pb-4 pt-1 border-t border-gray-200 text-xs sm:text-sm text-gray-700 leading-relaxed space-y-2">
              <p>
                Major relational database systems share the same ANSI/ISO SQL standards for queries,
                making your SQL knowledge universally transferable:
              </p>
              <ul className="list-disc pl-5 space-y-1 text-xs">
                <li><strong>SQLite:</strong> Lightweight, serverless engine embedded directly in applications and web browsers. (Runs locally in your browser right now!)</li>
                <li><strong>PostgreSQL:</strong> Highly extensible open-source object-relational database popular in analytics and modern web stacks.</li>
                <li><strong>MySQL:</strong> World-renowned open-source relational engine widely used in web development and hosting.</li>
                <li><strong>Microsoft SQL Server:</strong> Enterprise database system integrated deeply with Windows and Azure.</li>
                <li><strong>Oracle Database:</strong> High-performance transactional database common in banking and enterprise infrastructures.</li>
              </ul>
            </div>
          </details>
        </div>

        {/* ========================================================= */}
        {/* STEP 4: KNOWLEDGE ASSESSMENT (EMBEDDED QUIZ)             */}
        {/* ========================================================= */}
        <section ref={quizRef} className="mt-10 mb-8 pt-6 border-t border-gray-200">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 pb-1.5 border-b-2 border-[#0066cc] mb-3">
            Step 4: Knowledge Assessment
          </h2>

          <p className="text-xs sm:text-sm text-gray-600 leading-relaxed mb-6">
            Complete the 10 assessment questions below to test your practical and conceptual mastery
            of this tutorial. Achieve 80% (8/10) to mark this lesson complete.
          </p>

          <QuizRunner
            key={`quiz_${lesson.id}`}
            quizId={`quiz_${lesson.id}`}
            title={`Lesson ${lesson.number}: ${lesson.title}`}
            description="Test your conceptual and practical understanding of this lesson's topics."
            questions={lesson.quiz}
            onComplete={handleQuizComplete}
            initialAnswers={currentQuizAttempt?.userAnswers}
            initialScore={currentQuizAttempt?.score}
            initialPassed={currentQuizAttempt?.passed}
          />
        </section>

        {/* ========================================================= */}
        {/* BOTTOM LESSON NAVIGATION                                 */}
        {/* ========================================================= */}
        <footer className="pt-6 border-t border-gray-200 flex flex-col sm:flex-row items-center justify-between gap-3">
          {prevLesson ? (
            <Button
              variant="outline"
              size="md"
              onClick={() => navigate(`/learn/${prevLesson.slug}`)}
              className="text-xs min-h-[44px] w-full sm:w-auto"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Previous: Lesson {prevLesson.number}</span>
            </Button>
          ) : (
            <div className="hidden sm:block" />
          )}

          <Button
            variant="ghost"
            size="md"
            onClick={() => navigate('/learn')}
            className="text-xs text-gray-600 hover:text-gray-900 min-h-[44px] w-full sm:w-auto"
          >
            <BookOpen className="w-4 h-4 mr-1.5" />
            <span>Course Lessons</span>
          </Button>

          {nextLesson ? (
            <Button
              variant="primary"
              size="md"
              onClick={() => navigate(`/learn/${nextLesson.slug}`)}
              className="text-xs font-semibold min-h-[44px] w-full sm:w-auto bg-[#0066cc] hover:bg-[#0052a3]"
            >
              <span>Continue: Lesson {nextLesson.number}</span>
              <ArrowRight className="w-4 h-4" />
            </Button>
          ) : (
            <Button
              variant="primary"
              size="md"
              onClick={() => navigate('/quizzes')}
              className="text-xs font-semibold min-h-[44px] w-full sm:w-auto bg-[#0066cc]"
            >
              <span>View All Quizzes</span>
            </Button>
          )}
        </footer>
      </article>
    </div>
  );
}
