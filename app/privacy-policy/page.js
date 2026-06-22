export const metadata = {
  title: 'Privacy Policy | SmartCalcTools',
  description: 'Our privacy policy detailing how SmartCalcTools protects your data using 100% client-side Zero Trust architecture.',
};

export default function PrivacyPolicyPage() {
  return (
    <div className="container" style={{ padding: '40px 20px', maxWidth: '800px', lineHeight: '1.8' }}>
      <h1>Privacy Policy</h1>
      <p style={{ color: 'var(--text-muted)', marginBottom: '24px' }}>Last updated: June 2026</p>

      <section className="card" style={{ marginBottom: '32px' }}>
        <h2>1. Zero Data Collection (100% Client-Side)</h2>
        <p>
          At SmartCalcTools, we take a radical approach to privacy: <strong>we collect absolutely nothing</strong>. All of our tools, including the Semantic PDF Search, JSON Formatter, and Password Generator, run 100% locally in your web browser. 
        </p>
        <p style={{ marginTop: '12px' }}>
          When you upload a file or paste sensitive text, it never leaves your device. We do not have servers that process your data.
        </p>
      </section>

      <section className="card" style={{ marginBottom: '32px' }}>
        <h2>2. Third-Party Services</h2>
        <p>
          To keep the lights on, we use non-invasive analytics (like basic page views) and may display contextual advertisements. These third-party services (such as Google AdSense) may use cookies or similar technologies to serve ads based on your visit.
        </p>
        <p style={{ marginTop: '12px' }}>
          <strong>Crucially:</strong> These third parties have zero access to the data you process within our tools. The execution context of our calculators and AI models is strictly isolated.
        </p>
      </section>

      <section className="card" style={{ marginBottom: '32px' }}>
        <h2>3. Local Storage</h2>
        <p>
          Some tools may use your browser's local storage to save your preferences (like Dark Mode settings). This data remains on your device and can be cleared at any time through your browser settings.
        </p>
      </section>
    </div>
  );
}
