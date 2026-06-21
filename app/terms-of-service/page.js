export const metadata = {
  title: 'Terms of Service | SmartCalcTools',
  description: 'Terms of Service and conditions of use for SmartCalcTools. Please read these terms carefully before using our free tools and calculators.'
};

export default function TermsOfService() {
  return (
    <div className="container" style={{ padding: '40px 20px', maxWidth: '800px' }}>
      <div className="page-header">
        <h1>Terms of Service</h1>
        <p>Last Updated: June 2026</p>
      </div>
      <article className="card" style={{ lineHeight: '1.8' }}>
        <h2 style={{ marginBottom: '16px' }}>1. Acceptance of Terms</h2>
        <p style={{ marginBottom: '24px', color: 'var(--text-muted)' }}>
          By accessing and using SmartCalcTools (the "Website"), you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by these terms, please do not use this Website.
        </p>

        <h2 style={{ marginBottom: '16px' }}>2. Use of Our Tools</h2>
        <p style={{ marginBottom: '24px', color: 'var(--text-muted)' }}>
          SmartCalcTools provides free online financial calculators and developer tools. These tools are provided for informational and educational purposes only. While we strive to ensure the accuracy of our calculators, we do not guarantee that the results are 100% accurate or suitable for your specific financial or technical needs.
        </p>

        <h2 style={{ marginBottom: '16px' }}>3. No Financial Advice</h2>
        <p style={{ marginBottom: '24px', color: 'var(--text-muted)' }}>
          The calculators provided on this Website (such as the Zakat, Murabaha, and ROI calculators) are meant to provide estimations based on the data you input. They do not constitute professional financial, legal, or religious advice. You should always consult with a qualified professional or religious scholar before making significant financial decisions based on the outputs of our tools.
        </p>

        <h2 style={{ marginBottom: '16px' }}>4. Disclaimer of Warranties</h2>
        <p style={{ marginBottom: '24px', color: 'var(--text-muted)' }}>
          The Website and all tools are provided on an "as is" and "as available" basis without any warranties of any kind, either express or implied. We do not warrant that the tools will be uninterrupted or error-free.
        </p>

        <h2 style={{ marginBottom: '16px' }}>5. Limitation of Liability</h2>
        <p style={{ color: 'var(--text-muted)' }}>
          In no event shall SmartCalcTools be liable for any direct, indirect, incidental, consequential, or special damages arising out of or in any way connected with the use of our tools or Website.
        </p>
      </article>
    </div>
  );
}
