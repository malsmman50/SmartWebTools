'use client';

export default function Contact() {
  return (
    <div className="container" style={{ padding: '40px 20px', maxWidth: '800px' }}>
      <div className="page-header">
        <h1>Contact Us</h1>
        <p>We'd love to hear from you.</p>
      </div>
      <div className="grid-2">
        <article className="card" style={{ lineHeight: '1.8' }}>
          <h2 style={{ marginBottom: '16px' }}>Get in Touch</h2>
          <p style={{ marginBottom: '24px', color: 'var(--text-muted)' }}>
            Have a question, feedback, or a feature request for a new calculator or tool? Send us a message and our team will get back to you as soon as possible.
          </p>
          <div style={{ marginBottom: '16px' }}>
            <h4 style={{ marginBottom: '4px' }}>Email</h4>
            <a href="mailto:support@smartcalctools.xyz" style={{ fontWeight: '600' }}>support@smartcalctools.xyz</a>
          </div>
          <div>
            <h4 style={{ marginBottom: '4px' }}>Business Inquiries</h4>
            <a href="mailto:business@smartcalctools.xyz" style={{ fontWeight: '600' }}>business@smartcalctools.xyz</a>
          </div>
        </article>
        
        <form className="card" onSubmit={(e) => e.preventDefault()}>
          <h3 style={{ marginBottom: '20px' }}>Send a Message</h3>
          <div style={{ marginBottom: '16px' }}>
            <label className="label">Name</label>
            <input type="text" className="input" placeholder="Your Name" required />
          </div>
          <div style={{ marginBottom: '16px' }}>
            <label className="label">Email Address</label>
            <input type="email" className="input" placeholder="you@example.com" required />
          </div>
          <div style={{ marginBottom: '20px' }}>
            <label className="label">Message</label>
            <textarea className="input" rows="5" placeholder="How can we help?" required></textarea>
          </div>
          <button type="submit" className="btn btn-primary" style={{ width: '100%', justifyContent: 'center' }}>
            Send Message
          </button>
        </form>
      </div>
    </div>
  );
}
