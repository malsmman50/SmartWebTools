import sanitizeHtml from 'sanitize-html';

/**
 * Sanitizes AI-generated article HTML before rendering.
 * Defense-in-depth against stored XSS: even if a malicious tag ever lands in
 * blog-data.json (via the auto-blog pipeline or manual edits), it is stripped
 * here at render time.
 */
export function sanitizeArticleHtml(html) {
  return sanitizeHtml(String(html || ''), {
    allowedTags: [
      'h2', 'h3', 'h4', 'p', 'ul', 'ol', 'li',
      'strong', 'em', 'b', 'i', 'a', 'code', 'pre',
      'blockquote', 'table', 'thead', 'tbody', 'tr', 'td', 'th',
      'br', 'hr', 'div', 'span',
    ],
    allowedAttributes: { a: ['href'] },
    // Only a fixed whitelist of callout classes is allowed on div/span. No
    // arbitrary class, style, id, or event attributes ever pass through — this
    // keeps the XSS surface closed while enabling the article callout boxes.
    allowedClasses: {
      div: ['callout', 'callout-note', 'callout-tip', 'callout-warning', 'callout-key'],
      span: ['callout', 'callout-note', 'callout-tip', 'callout-warning', 'callout-key'],
    },
    allowedSchemes: ['https', 'mailto'],
    transformTags: {
      a: (tagName, attribs) => {
        const href = attribs.href || '';
        const isInternal = href.startsWith('https://smartcalctools.xyz') || href.startsWith('/');
        return {
          tagName: 'a',
          attribs: isInternal
            ? { href }
            : { href, rel: 'nofollow noopener', target: '_blank' },
        };
      },
    },
  });
}
