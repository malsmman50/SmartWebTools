export const metadata = {
  title: 'Terms of Service & Disclaimer | SmartCalcTools',
  description: 'Terms of service and Shariah compliance disclaimers for SmartCalcTools.',
};

export default function TermsPage() {
  return (
    <div className="container" style={{ padding: '60px 20px', maxWidth: '800px' }}>
      <div className="page-header">
        <h1>Terms of Service & Disclaimer</h1>
        <p>Last updated: June 2026</p>
      </div>

      <div className="card" style={{ padding: '40px' }}>
        <div style={{ padding: '24px', background: 'var(--bg)', borderRadius: '8px', borderLeft: '4px solid var(--primary)', marginBottom: '32px' }}>
          <h2 style={{ marginBottom: '16px', fontSize: '1.2rem' }}>⚠️ Important Shariah Disclaimer (Not a Fatwa)</h2>
          <p style={{ lineHeight: '1.8', fontSize: '0.95rem' }}>
            The calculators and educational tools provided on SmartCalcTools are designed as mathematical utilities to apply general Islamic finance principles. <strong>The results provided do not constitute a Fatwa (religious ruling), personalized Shariah advisory, or legal/financial advice.</strong> Islamic finance is highly nuanced and specific rulings can vary based on individual circumstances and differences in recognized schools of jurisprudence (Madhahib). We strongly advise all users to verify these calculations and consult with a qualified Islamic scholar or certified Shariah advisor before making binding financial decisions or fulfilling religious obligations like Zakat.
          </p>
        </div>

        <h2 style={{ marginBottom: '16px' }}>1. Terms</h2>
        <p style={{ marginBottom: '24px', lineHeight: '1.8' }}>
          By accessing the website at https://smartcalctools.xyz, you are agreeing to be bound by these terms of service, all applicable laws and regulations, and agree that you are responsible for compliance with any applicable local laws.
        </p>

        <h2 style={{ marginBottom: '16px' }}>2. Use License</h2>
        <p style={{ marginBottom: '24px', lineHeight: '1.8' }}>
          Permission is granted to temporarily use the tools and calculators on SmartCalcTools for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title.
        </p>

        <h2 style={{ marginBottom: '16px' }}>3. Accuracy and Liability</h2>
        <p style={{ marginBottom: '24px', lineHeight: '1.8' }}>
          While we strive to ensure our formulas align with standard mathematical and Islamic financial principles, we make no representations or warranties regarding the absolute completeness or accuracy of the results for every unique situation. The materials appearing on SmartCalcTools' website could include technical, typographical, or mathematical errors. SmartCalcTools disclaims any liability for financial loss, legal consequences, or religious obligations unfulfilled due to reliance on this tool.
        </p>

        <h2 style={{ marginBottom: '16px' }}>4. Modifications</h2>
        <p style={{ lineHeight: '1.8' }}>
          SmartCalcTools may revise these terms of service for its website at any time without notice. By using this website you are agreeing to be bound by the then current version of these terms of service.
        </p>
      </div>
    </div>
  );
}
