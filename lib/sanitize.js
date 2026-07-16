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
      'br', 'hr',
    ],
    allowedAttributes: { a: ['href'] },
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
