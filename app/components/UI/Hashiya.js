import Link from "next/link";
import { getSource } from "@/lib/sources";
import DisclaimerBox from "@/app/components/UI/DisclaimerBox";

/**
 * The hashiya — the margin that carries a result's basis.
 *
 * A fiqh manuscript keeps its evidence in the margin beside the body text,
 * not in an appendix. That is the arrangement this component reproduces, and
 * it solves a real problem for this site: where do you put a Sharia source so
 * it is neither buried in a footer nobody reads nor shoved in front of the
 * answer the visitor came for?
 *
 * Deliberately not collapsible, and it does not disappear on mobile. Whether
 * a reader can check the basis is part of whether the answer is usable, so it
 * is not progressive-disclosure material.
 *
 * @param {string} source - key into lib/sources.js
 * @param {string} lang - "ar" | "en"
 * @param {string} [methodologyAnchor] - id on /methodology to link to
 * @param {boolean} [religious=true] - show the religious disclaimer
 * @param {string} [extraDisclaimer] - an additional DisclaimerBox type, e.g. "financial"
 */
export default function Hashiya({ source, lang, methodologyAnchor, religious = true, extraDisclaimer }) {
  const data = getSource(source, lang);
  if (!data) return null;

  const isAr = lang === "ar";

  return (
    <aside className="hashiya" aria-label={isAr ? "المستند" : "Basis"}>
      <h4>{isAr ? "المستند" : "The basis"}</h4>

      <dl className="hashiya-list">
        {data.rows.map(([term, detail]) => (
          <div key={term}>
            <dt>{term}</dt>
            <dd>{detail}</dd>
          </div>
        ))}
      </dl>

      {data.note && <p className="hashiya-note">{data.note}</p>}

      {methodologyAnchor && (
        <Link href={`/${lang}/methodology#${methodologyAnchor}`} className="hashiya-link">
          {isAr ? "المنهجية الكاملة ←" : "Full methodology →"}
        </Link>
      )}

      {(religious || extraDisclaimer) && (
        <div className="hashiya-warn">
          {extraDisclaimer && <DisclaimerBox type={extraDisclaimer} lang={lang} />}
          {religious && <DisclaimerBox type="religious" lang={lang} />}
        </div>
      )}
    </aside>
  );
}
