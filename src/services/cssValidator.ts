import { CssValidationRule } from '../types/cssLesson';

export interface CssRuleResult {
  ruleId: string;
  description: string;
  passed: boolean;
  message?: string;
}

export interface CssValidationResult {
  allPassed: boolean;
  results: CssRuleResult[];
  summary: string;
}

/**
 * Validates user-submitted CSS by checking declarations and computed styles inside an isolated DOM sandbox.
 * 100% Client-side and offline capable.
 */
export function validateCssCode(
  userCss: string,
  htmlSnippet: string,
  rules: CssValidationRule[]
): CssValidationResult {
  if (!userCss || userCss.trim().length === 0) {
    return {
      allPassed: false,
      results: rules.map((r) => ({
        ruleId: r.id,
        description: r.description,
        passed: false,
        message: 'Write some CSS styling rules to begin.',
      })),
      summary: 'Please enter your CSS rules.',
    };
  }

  // Create isolated headless iframe or DOM container
  const container = document.createElement('div');
  container.style.position = 'fixed';
  container.style.top = '-9999px';
  container.style.left = '-9999px';
  container.style.visibility = 'hidden';
  container.style.width = '800px';

  // Inject sanitized HTML + student CSS
  container.innerHTML = `
    <style id="student-css">${userCss}</style>
    <div id="sandbox-root">${htmlSnippet}</div>
  `;
  document.body.appendChild(container);

  const cleanCss = userCss.toLowerCase().replace(/\s+/g, ' ');
  const results: CssRuleResult[] = [];

  try {
    for (const rule of rules) {
      let passed = false;
      let message: string | undefined;

      const targetEl = container.querySelector(rule.targetSelector) as HTMLElement | null;

      // 1. Check custom validators
      if (rule.customValidator === 'has-gradient') {
        const hasGrad = /linear-gradient|radial-gradient/i.test(userCss);
        passed = hasGrad;
        if (!passed) message = 'Include a linear-gradient(...) or radial-gradient(...) background.';
      } else if (rule.customValidator === 'is-flex-centered') {
        const isFlex = /display\s*:\s*flex/i.test(cleanCss);
        const hasCenter = /justify-content\s*:\s*center/i.test(cleanCss) || /align-items\s*:\s*center/i.test(cleanCss);
        passed = isFlex && hasCenter;
        if (!passed) message = 'Use display: flex with justify-content: center or align-items: center.';
      } else if (rule.customValidator === 'is-grid-layout') {
        const isGrid = /display\s*:\s*grid/i.test(cleanCss);
        const hasCols = /grid-template-columns/i.test(cleanCss);
        passed = isGrid && hasCols;
        if (!passed) message = 'Use display: grid with grid-template-columns to define columns.';
      } else if (rule.customValidator === 'has-media-query') {
        const hasMedia = /@media\s*\(/i.test(userCss);
        passed = hasMedia;
        if (!passed) message = 'Add a responsive @media (...) query block.';
      } else if (rule.customValidator === 'has-transition') {
        const hasTrans = /transition\s*:/i.test(cleanCss);
        passed = hasTrans;
        if (!passed) message = 'Add a transition property for smooth animated state changes.';
      } else if (rule.customValidator === 'has-hover-state') {
        const hasHover = /:hover/i.test(cleanCss);
        passed = hasHover;
        if (!passed) message = 'Include a :hover pseudo-class rule.';
      }

      // 2. Computed Style or CSS text verification
      if (!rule.customValidator && targetEl) {
        const computed = window.getComputedStyle(targetEl);
        const camelProp = rule.property.replace(/-([a-z])/g, (_, letter) => letter.toUpperCase());
        const compVal = (computed as any)[camelProp] || computed.getPropertyValue(rule.property);

        if (rule.expectedValue) {
          const normExpected = rule.expectedValue.toLowerCase();
          const normComp = (compVal || '').toLowerCase();
          const rawRegex = new RegExp(`${rule.property}\\s*:\\s*[^;]*${rule.expectedValue}`, 'i');

          passed = normComp.includes(normExpected) || rawRegex.test(cleanCss);
          if (!passed) {
            message = `Expected ${rule.property}: ${rule.expectedValue}, but got '${compVal || 'none'}'.`;
          }
        } else if (rule.pattern) {
          const regex = new RegExp(rule.pattern, 'i');
          passed = regex.test(compVal || '') || regex.test(cleanCss);
          if (!passed) {
            message = `Declaration '${rule.property}' did not match pattern '${rule.pattern}'.`;
          }
        } else {
          // Property must simply be defined / non-empty in CSS
          const propRegex = new RegExp(`${rule.property}\\s*:`, 'i');
          passed = propRegex.test(cleanCss);
          if (!passed) {
            message = `Missing CSS declaration for '${rule.property}'.`;
          }
        }
      } else if (!rule.customValidator && !targetEl) {
        // Element not found in snippet, fallback to CSS text search
        const propRegex = new RegExp(`${rule.property}\\s*:`, 'i');
        passed = propRegex.test(cleanCss);
        if (!passed) {
          message = `Target element '${rule.targetSelector}' not found or missing property '${rule.property}'.`;
        }
      }

      results.push({
        ruleId: rule.id,
        description: rule.description,
        passed,
        message: passed ? undefined : message,
      });
    }
  } finally {
    document.body.removeChild(container);
  }

  const allPassed = results.every((r) => r.passed);
  const passedCount = results.filter((r) => r.passed).length;
  const summary = allPassed
    ? 'All styling criteria successfully met!'
    : `${passedCount} of ${rules.length} styling criteria satisfied.`;

  return {
    allPassed,
    results,
    summary,
  };
}
