export const metadata = {
  title: 'About SmartCalcTools | Privacy-First Calculators',
  description: 'Learn about SmartCalcTools, our mission to build 100% private, client-side, and Sharia-compliant developer and financial tools.',
};

export default function AboutPage() {
  return (
    <div className="container" style={{ padding: '40px 20px', maxWidth: '800px', lineHeight: '1.8' }}>
      <h1>About SmartCalcTools</h1>
      <p style={{ fontSize: '1.1rem', color: 'var(--text-muted)', marginBottom: '24px' }}>
        Empowering users with 100% private, fast, and secure tools.
      </p>

      <section className="card" style={{ marginBottom: '32px' }}>
        <h2>Our Mission</h2>
        <p>
          SmartCalcTools was born out of a simple necessity: the need for reliable, privacy-first web utilities. In an era where every piece of data is tracked, we decided to build a platform that respects your privacy by default.
        </p>
        <p style={{ marginTop: '12px' }}>
          Whether you are a software developer needing to format JSON or decode a JWT, or a Muslim looking for mathematically precise, Sharia-compliant financial calculators, our tools run entirely in your browser. <strong>No data leaves your device.</strong>
        </p>
      </section>

      <section className="card" style={{ marginBottom: '32px' }}>
        <h2>The Zero Trust Architecture</h2>
        <p>
          We use modern WebAssembly and WebGPU technologies to bring powerful capabilities directly to your browser. Our <strong>Semantic PDF Search</strong> tool downloads a multilingual AI model directly to your device's cache, allowing you to search highly sensitive documents (like NDAs or tax returns) without ever sending the file to a cloud server.
        </p>
      </section>

      <section className="card" style={{ marginBottom: '32px' }}>
        <h2>Islamic Finance Commitment</h2>
        <p>
          Our financial calculators (Zakat, Murabaha, Mudarabah, Islamic FIRE) are built with strict adherence to Islamic Fiqh principles. We consult standard AAOIFI guidelines and use real-time gold APIs to ensure absolute precision, avoiding the common interest-based assumptions found in conventional financial tools.
        </p>
      </section>
    </div>
  );
}
