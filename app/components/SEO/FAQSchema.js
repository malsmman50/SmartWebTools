// Accepts both historical call shapes: `faqs` with {question, answer}
// and `faqData` with {q, a} — five pages used the latter and silently
// rendered no schema at all.
export default function FAQSchema({ faqs, faqData }) {
  const list = faqs || faqData;
  if (!list || list.length === 0) return null;

  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": list.map((faq) => ({
      "@type": "Question",
      "name": faq.question || faq.q,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer || faq.a
      }
    }))
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, '\\u003c') }}
    />
  );
}
