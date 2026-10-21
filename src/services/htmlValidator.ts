import { HtmlValidationRule } from '../types/htmlLesson';

export interface RuleEvaluationResult {
  ruleId: string;
  description: string;
  passed: boolean;
  message?: string;
}

export interface HtmlValidationResult {
  allPassed: boolean;
  results: RuleEvaluationResult[];
  error?: string;
  summary: string;
}

/**
 * Validates user-submitted HTML against criteria using native browser DOMParser.
 * 100% Client-side, runs in-browser offline.
 */
export function validateHtmlCode(
  userHtml: string,
  rules: HtmlValidationRule[]
): HtmlValidationResult {
  if (!userHtml || userHtml.trim().length === 0) {
    return {
      allPassed: false,
      results: rules.map((r) => ({
        ruleId: r.id,
        description: r.description,
        passed: false,
        message: 'Write some HTML code to begin.',
      })),
      summary: 'Please enter HTML code.',
    };
  }

  const parser = new DOMParser();
  const doc = parser.parseFromString(userHtml, 'text/html');

  const parserErrors = doc.querySelectorAll('parsererror');
  if (parserErrors.length > 0) {
    return {
      allPassed: false,
      results: rules.map((r) => ({
        ruleId: r.id,
        description: r.description,
        passed: false,
        message: 'Syntax error detected in HTML document.',
      })),
      error: parserErrors[0]?.textContent || 'HTML parsing error',
      summary: 'HTML syntax error detected.',
    };
  }

  const results: RuleEvaluationResult[] = [];
  const lowerHtml = userHtml.toLowerCase();

  for (const rule of rules) {
    let passed = true;
    let message: string | undefined;

    // Check custom checks (e.g. <!DOCTYPE html>, head, body)
    if (rule.customCheckId === 'has-valid-doctype') {
      const hasDoctype = /<!doctype\s+html>/i.test(userHtml);
      passed = hasDoctype;
      if (!passed) message = 'Missing <!DOCTYPE html> declaration at the top.';
    } else if (rule.customCheckId === 'head-and-body') {
      const hasHead = /<head[\s>]/i.test(userHtml);
      const hasBody = /<body[\s>]/i.test(userHtml);
      passed = hasHead && hasBody;
      if (!passed) message = 'Make sure to include both <head> and <body> elements.';
    }

    // Check CSS Selector & Counts
    if (passed && rule.selector) {
      try {
        const matches = doc.querySelectorAll(rule.selector);
        if (rule.minCount !== undefined && matches.length < rule.minCount) {
          passed = false;
          message = `Expected at least ${rule.minCount} '${rule.selector}' element(s), found ${matches.length}.`;
        } else if (rule.exactCount !== undefined && matches.length !== rule.exactCount) {
          passed = false;
          message = `Expected exactly ${rule.exactCount} '${rule.selector}' element(s), found ${matches.length}.`;
        } else if (matches.length === 0 && rule.minCount === undefined && rule.exactCount === undefined) {
          passed = false;
          message = `Could not find element matching '${rule.selector}'.`;
        }

        // Check attributes on matched elements
        if (passed && rule.attributeCheck && matches.length > 0) {
          const { name, value, mustNotBeEmpty, pattern } = rule.attributeCheck;
          let attrPassed = false;

          for (const el of Array.from(matches)) {
            const attrVal = el.getAttribute(name);
            if (attrVal === null) continue;

            if (mustNotBeEmpty && attrVal.trim().length === 0) continue;

            if (value !== undefined) {
              if (attrVal.toLowerCase().includes(value.toLowerCase())) {
                attrPassed = true;
                break;
              }
            } else if (pattern) {
              const regex = new RegExp(pattern, 'i');
              if (regex.test(attrVal)) {
                attrPassed = true;
                break;
              }
            } else {
              attrPassed = true;
              break;
            }
          }

          if (!attrPassed) {
            passed = false;
            message = `Element '${rule.selector}' is missing attribute '${name}' or has an invalid value.`;
          }
        }

        // Check text content within matched elements
        if (passed && rule.textContains && matches.length > 0) {
          let textFound = false;
          const searchLower = rule.textContains.toLowerCase();
          for (const el of Array.from(matches)) {
            if ((el.textContent || '').toLowerCase().includes(searchLower)) {
              textFound = true;
              break;
            }
          }
          if (!textFound) {
            passed = false;
            message = `Element '${rule.selector}' must contain text: "${rule.textContains}".`;
          }
        }
      } catch {
        passed = false;
        message = `Failed evaluating selector: ${rule.selector}`;
      }
    }

    // Direct text search fallback if no selector
    if (passed && !rule.selector && rule.textContains) {
      if (!lowerHtml.includes(rule.textContains.toLowerCase())) {
        passed = false;
        message = `HTML must contain text: "${rule.textContains}".`;
      }
    }

    results.push({
      ruleId: rule.id,
      description: rule.description,
      passed,
      message,
    });
  }

  const allPassed = results.every((r) => r.passed);
  const passedCount = results.filter((r) => r.passed).length;
  const summary = allPassed
    ? 'All criteria successfully passed!'
    : `${passedCount} of ${rules.length} criteria met.`;

  return {
    allPassed,
    results,
    summary,
  };
}
