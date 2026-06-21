export const metadata = {
  title: 'About Us | SmartCalcTools',
  description: 'Learn more about SmartCalcTools, our mission to provide Halal financial calculators, and high-performance developer utilities.'
};

export default function About() {
  return (
    <div className="container" style={{ padding: '40px 20px', maxWidth: '800px' }}>
      <div className="page-header">
        <h1>About SmartCalcTools</h1>
        <p>Built for Speed, Privacy, and Ethical Finance.</p>
      </div>
      <article className="card" style={{ lineHeight: '1.8' }}>
        <h2 style={{ marginBottom: '16px' }}>Our Mission</h2>
        <p style={{ marginBottom: '24px', color: 'var(--text-muted)' }}>
          SmartCalcTools was founded with a clear vision: to provide a suite of highly reliable, blazing-fast, and completely private web utilities. We noticed that many online tools are cluttered with popups, require unnecessary sign-ups, or worse, send your sensitive data to remote servers. We set out to change that by building tools that run entirely in your web browser.
        </p>

        <h2 style={{ marginBottom: '16px' }}>Halal Financial Tools</h2>
        <p style={{ marginBottom: '24px', color: 'var(--text-muted)' }}>
          We also recognized a massive gap in the market for Islamic financial planning tools. Most online calculators focus on interest-based (Riba) loans and mortgages. At SmartCalcTools, we are committed to ethical finance. We provide world-class Zakat, Murabaha, and Mudarabah calculators that adhere to Islamic principles, making it easier for Muslims globally to manage their wealth responsibly.
        </p>

        <h2 style={{ marginBottom: '16px' }}>Our Technology</h2>
        <p style={{ marginBottom: '24px', color: 'var(--text-muted)' }}>
          Our platform is built using modern web technologies like Next.js and React. By leveraging Static Site Generation (SSG) and strictly client-side execution, we guarantee that:
        </p>
        <ul style={{ paddingLeft: '20px', marginBottom: '24px', color: 'var(--text-muted)' }}>
          <li style={{ marginBottom: '8px' }}>Your data never leaves your device.</li>
          <li style={{ marginBottom: '8px' }}>The tools load instantly, even on slow connections.</li>
          <li style={{ marginBottom: '8px' }}>Our site is inherently secure against server-side data breaches.</li>
        </ul>

        <h2 style={{ marginBottom: '16px' }}>Who We Are</h2>
        <p style={{ color: 'var(--text-muted)' }}>
          We are a small team of developers and Islamic finance enthusiasts dedicated to building tools that empower users. Whether you are a software engineer formatting a massive JSON payload, or an investor calculating your annual Zakat, we build tools that respect your time and values.
        </p>
      </article>
    </div>
  );
}
