import { execSync } from 'child_process';

const routes = [
  '/',
  '/learn',
  '/learn/sql-basics',
  '/learn/numerical-constraints',
  '/learn/text-constraints',
  '/learn/distinct-results',
  '/learn/sorting-results',
  '/learn/limiting-results',
  '/learn/relational-joins',
  '/learn/outer-joins',
  '/learn/handling-nulls',
  '/learn/calculated-expressions',
  '/learn/aggregate-functions',
  '/learn/grouped-aggregations',
  '/learn/query-order-of-execution',
  '/learn/inserting-rows',
  '/learn/updating-deleting-rows',
  '/learn/database-schema-management',
  '/practice',
  '/quizzes',
  '/progress',
  '/bookmarks',
  '/notes',
  '/settings',
  '/about',
  '/accessibility',
  '/privacy'
];

const edgePath = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';

let hasAnyError = false;

for (const r of routes) {
  const url = `http://127.0.0.1:5173${r}`;
  try {
    const output = execSync(`"${edgePath}" --headless --disable-gpu --dump-dom "${url}"`, {
      encoding: 'utf-8',
      timeout: 10000
    });
    
    // Check for runtime error indicators
    const isError = output.includes('Something went wrong') || 
                    output.includes('React error') || 
                    output.includes('Cannot read properties of') ||
                    output.includes('is not defined');

    if (isError) {
      console.error(`[FAIL] ${r} rendered with error!`);
      hasAnyError = true;
    } else {
      console.log(`[PASS] ${r} (HTML size: ${output.length} bytes)`);
    }
  } catch (err) {
    console.error(`[CRASH] ${r}:`, err.message);
    hasAnyError = true;
  }
}

if (hasAnyError) {
  process.exit(1);
} else {
  console.log('ALL ROUTES PASSED DOM DUMP VERIFICATION!');
}
