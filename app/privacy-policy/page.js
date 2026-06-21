export const metadata = {
  title: 'Privacy Policy | SmartCalcTools',
  description: 'Our privacy policy detailing how we protect your data. SmartCalcTools processes all calculations locally in your browser.',
};

export default function PrivacyPolicyPage() {
  return (
    <div className="container" style={{ padding: '60px 20px', maxWidth: '800px' }}>
      <div className="page-header">
        <h1>Privacy Policy</h1>
        <p>Last updated: June 2026</p>
      </div>

      <div className="card" style={{ padding: '40px' }}>
        <h2 style={{ marginBottom: '16px' }}>1. Information Collection And Use</h2>
        <p style={{ marginBottom: '24px', lineHeight: '1.8' }}>
          At SmartCalcTools, privacy is our core architectural principle. <strong>All our financial calculators and developer tools operate 100% locally on your device (Client-Side)</strong>. When you input financial data, passwords, or documents, they are never transmitted to our servers or stored in any database.
        </p>

        <h2 style={{ marginBottom: '16px' }}>2. Log Data & Analytics</h2>
        <p style={{ marginBottom: '24px', lineHeight: '1.8' }}>
          Like many site operators, we collect basic, anonymized information that your browser sends whenever you visit our Site ("Log Data"). This Log Data may include information such as your computer's Internet Protocol ("IP") address, browser type, browser version, the pages of our Site that you visit, the time and date of your visit, and the time spent on those pages.
        </p>

        <h2 style={{ marginBottom: '16px' }}>3. Cookies and Advertising (Google AdSense)</h2>
        <p style={{ marginBottom: '24px', lineHeight: '1.8' }}>
          We use third-party advertising companies, specifically <strong>Google AdSense</strong>, to serve ads when you visit our website. These companies may use cookies (including the DoubleClick DART cookie) to serve ads based on your prior visits to our website or other websites on the Internet.<br/><br/>
          Users may opt out of the use of the DART cookie by visiting the Google Ad and Content Network privacy policy. We do not control these third-party cookies and their use is subject to the privacy policies of the advertising networks.
        </p>

        <h2 style={{ marginBottom: '16px' }}>4. Security</h2>
        <p style={{ marginBottom: '24px', lineHeight: '1.8' }}>
          The security of your Personal Information is important to us, but remember that no method of transmission over the Internet is 100% secure. Because our tools process data locally without transmission, the risk of data interception during tool usage is virtually zero. However, standard web browsing still carries inherent risks.
        </p>

        <h2 style={{ marginBottom: '16px' }}>5. Contact Us</h2>
        <p style={{ lineHeight: '1.8' }}>
          If you have any questions about this Privacy Policy, please contact us at: <a href="mailto:privacy@smartcalctools.xyz" style={{ fontWeight: 'bold' }}>privacy@smartcalctools.xyz</a>
        </p>
      </div>
    </div>
  );
}
