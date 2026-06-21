export const metadata = {
  title: 'Privacy Policy | SmartCalcTools',
  description: 'Privacy Policy for SmartCalcTools. We respect your privacy. All our tools run locally in your browser, and we do not collect or store your personal financial data.'
};

export default function PrivacyPolicy() {
  return (
    <div className="container" style={{ padding: '40px 20px', maxWidth: '800px' }}>
      <div className="page-header">
        <h1>Privacy Policy</h1>
        <p>Last Updated: June 2026</p>
      </div>
      <article className="card" style={{ lineHeight: '1.8' }}>
        <h2 style={{ marginBottom: '16px' }}>1. Information We Do Not Collect</h2>
        <p style={{ marginBottom: '24px', color: 'var(--text-muted)' }}>
          At SmartCalcTools, we prioritize your privacy. All of our calculators and developer tools—including the Zakat Calculator, Password Generator, and JSON Formatter—are completely <strong>client-side</strong>. This means that any data you enter into our tools is processed entirely within your own web browser. We do not transmit, collect, or store your financial numbers, passwords, or code snippets on any external servers.
        </p>

        <h2 style={{ marginBottom: '16px' }}>2. Information We Automatically Collect</h2>
        <p style={{ marginBottom: '24px', color: 'var(--text-muted)' }}>
          Like most websites, we may collect non-personally identifiable information that your browser sends whenever you visit our site. This log data may include information such as your computer's Internet Protocol ("IP") address, browser type, browser version, the pages of our site that you visit, the time and date of your visit, and other diagnostic data. This information is used solely for analyzing website traffic and improving user experience.
        </p>

        <h2 style={{ marginBottom: '16px' }}>3. Cookies and Third-Party Advertising</h2>
        <p style={{ marginBottom: '24px', color: 'var(--text-muted)' }}>
          We use third-party advertising companies, such as Google AdSense, to serve ads when you visit our website. These companies may use cookies to serve ads based on your prior visits to our website or other websites. Google's use of advertising cookies enables it and its partners to serve ads to your users based on their visit to your sites and/or other sites on the Internet. You may opt out of personalized advertising by visiting <a href="https://myadcenter.google.com/" target="_blank" rel="noopener noreferrer">Google's Ads Settings</a>.
        </p>

        <h2 style={{ marginBottom: '16px' }}>4. Security</h2>
        <p style={{ marginBottom: '24px', color: 'var(--text-muted)' }}>
          The security of your data is important to us. We have implemented strict Content Security Policies (CSP) and ensure that our tools do not rely on backend databases, making them inherently secure from server-side data breaches. However, please remember that no method of transmission over the internet or method of electronic storage is 100% secure.
        </p>

        <h2 style={{ marginBottom: '16px' }}>5. Contact Us</h2>
        <p style={{ color: 'var(--text-muted)' }}>
          If you have any questions about this Privacy Policy, please <a href="/contact">contact us</a>.
        </p>
      </article>
    </div>
  );
}
