export const metadata = {
  title: 'About Us | SmartCalcTools',
  description: 'Learn about our mission to provide high-quality, privacy-first, and Sharia-compliant calculators and developer tools.',
};

export default function AboutPage() {
  return (
    <div className="container" style={{ padding: '60px 20px', maxWidth: '800px' }}>
      <div className="page-header">
        <h1>About SmartCalcTools</h1>
        <p>Bridging the gap between modern technology and Islamic financial principles.</p>
      </div>

      <div className="card" style={{ padding: '40px' }}>
        <h2 style={{ marginBottom: '16px' }}>Our Mission</h2>
        <p style={{ marginBottom: '24px', lineHeight: '1.8' }}>
          SmartCalcTools was born out of a simple frustration: why is it so hard to find professional, fast, and completely private calculators for Islamic finance? While there are hundreds of developer tools and financial calculators online, very few respect user privacy, and even fewer cater to the specific requirements of Sharia-compliant wealth management.
        </p>

        <h2 style={{ marginBottom: '16px' }}>The Halal & Privacy First Approach</h2>
        <p style={{ marginBottom: '24px', lineHeight: '1.8' }}>
          We believe that financial tools should empower you without harvesting your data or pushing you toward interest-based (Riba) debt. That's why <strong>100% of our calculators run locally in your browser</strong>. When you calculate your Zakat, Mudarabah profit, or format a private JSON file, your data never leaves your device. We have no backend databases storing your financial inputs.
        </p>

        <h2 style={{ marginBottom: '16px' }}>Our Methodology & Expertise</h2>
        <p style={{ marginBottom: '24px', lineHeight: '1.8' }}>
          Our Islamic financial models are built upon the general mathematical guidelines set forth by classical Fiqh (Islamic jurisprudence) and modern standards like AAOIFI (Accounting and Auditing Organization for Islamic Financial Institutions). Our goal is to digitize these established frameworks to make them instantly accessible.
        </p>
        
        <p style={{ marginBottom: '24px', lineHeight: '1.8', color: 'var(--text-muted)', fontSize: '0.9rem', padding: '16px', background: 'var(--bg)', borderRadius: '8px' }}>
          <em>Note: While our team consists of experienced developers and researchers in Islamic finance, we are technologists, not Muftis. Our tools provide mathematical estimations and should not replace personalized consultation with a qualified Shariah scholar.</em>
        </p>

        <h2 style={{ marginBottom: '16px' }}>Get in Touch</h2>
        <p style={{ lineHeight: '1.8' }}>
          Have a suggestion for a new tool? Found a bug? We are constantly improving our algorithms and adding new utilities for developers and investors. <br/><br/>
          Contact us at: <a href="mailto:support@smartcalctools.xyz" style={{ fontWeight: 'bold' }}>support@smartcalctools.xyz</a>
        </p>
      </div>
    </div>
  );
}
