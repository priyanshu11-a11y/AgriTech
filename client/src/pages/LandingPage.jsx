import { Link, useNavigate } from 'react-router-dom';
import { FiClock, FiMonitor, FiArrowUp, FiAlignLeft } from 'react-icons/fi';
import { GiPlantSeed, GiFarmer, GiWaterDrop } from 'react-icons/gi';

export default function LandingPage() {
  const navigate = useNavigate();
  return (
    <div>
      {/* Navbar */}
      <nav className="navbar-agri" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <span className="navbar-brand">Agri-Tech</span>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <a href="#features" className="nav-link">Features</a>
          <a href="#services" className="nav-link">Services</a>
          <a href="#testimonials" className="nav-link">Testimonials</a>
          <a href="#contact" className="nav-link">Contact</a>
          <button className="btn-login" onClick={() => navigate('/login')}>Login</button>
        </div>
      </nav>

      {/* Hero */}
      <section className="hero-section">
        <div className="hero-overlay" />
        <div className="hero-content">
          <h1>Innovative Agriculture Solutions</h1>
          <p>Empowering farmers with cutting-edge technology to enhance productivity<br />and sustainability.</p>
          <button className="btn-get-started" onClick={() => navigate('/register')}>Get Started</button>
        </div>
      </section>

      {/* About */}
      <section className="about-section">
        <div className="label">ABOUT US</div>
        <h2>Welcome to Agro Tech</h2>
        <p style={{ maxWidth: 600, margin: '0 auto 40px', color: '#555', fontSize: '0.95rem' }}>
          Agro Tech is dedicated to revolutionizing the agricultural industry through innovative technology and solutions.
        </p>
        <div className="about-cards">
          {[
            { icon: <FiClock />, title: 'Our Mission', desc: 'Our mission is to enhance productivity and sustainability in agriculture through cutting-edge technology and data-driven solutions.' },
            { icon: <FiMonitor />, title: 'Our Vision', desc: 'Our vision is to be a global leader in providing innovative agricultural technologies that empower farmers and agribusinesses to thrive.' },
            { icon: <FiArrowUp />, title: 'Our Values', desc: 'We value innovation, sustainability, and collaboration. We are committed to creating solutions that benefit farmers, consumers, and the environment.' },
            { icon: <FiAlignLeft />, title: 'Our Impact', desc: 'Our solutions have improved crop yields, reduced resource usage, and enhanced the livelihoods of countless farmers worldwide.' },
          ].map((c, i) => (
            <div className="about-card" key={i}>
              <div className="about-card-icon">{c.icon}</div>
              <div>
                <h4>{c.title}</h4>
                <p>{c.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Stats */}
      <section className="about-section" style={{ paddingTop: 0 }}>
        <div className="stats-grid">
          {[['10K+', 'Farmers Empowered'], ['30%', 'Yield Improvement'], ['50%', 'Water Savings'], ['100+', 'Innovations']].map(([n, l]) => (
            <div className="stat-card" key={l}>
              <div className="stat-number">{n}</div>
              <div className="stat-label">{l}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="features-section" id="features">
        <h2>Our Features</h2>
        <div className="features-grid">
          {[
            { icon: <GiPlantSeed />, title: 'Crop Management', desc: 'Real-time monitoring of crop health to detect diseases and pests early.' },
            { icon: <GiFarmer />, title: 'Farm Management', desc: 'Real-time Farm Management where user can access complete farm management' },
            { icon: <GiWaterDrop />, title: 'Smart Irrigation', desc: 'Efficient water management systems that save water and improve crop yields.' },
          ].map((f, i) => (
            <div className="feature-card" key={i}>
              <div className="feature-icon-circle">{f.icon}</div>
              <h4>{f.title}</h4>
              <p>{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Services */}
      <section className="services-section" id="services">
        <h2>Our Services</h2>
        <div className="features-grid">
          {[
            { icon: '🌾', title: 'Soil Analysis', desc: 'Advanced soil testing to optimize nutrient management for better crop yields.' },
            { icon: '🌦️', title: 'Weather Forecasting', desc: 'Accurate, real-time weather forecasts tailored to your farm location.' },
            { icon: '🐛', title: 'Pest & Disease Alerts', desc: 'Early warning system for pest and disease threats with treatment recommendations.' },
          ].map((s, i) => (
            <div className="feature-card" key={i} style={{ background: '#fff' }}>
              <div className="feature-icon-circle" style={{ fontSize: '2rem' }}>{s.icon}</div>
              <h4>{s.title}</h4>
              <p>{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="testimonials-section" id="testimonials">
        <h2>What Farmers Say</h2>
        <div className="testimonials-grid">
          {[
            { text: '"Agri-Tech has transformed my farming. The weather alerts helped me save my entire wheat crop from an unexpected frost."', author: 'Ramesh Kumar, Punjab' },
            { text: '"The crop monitoring feature is incredible. I detected a pest infestation early and took action before it could spread."', author: 'Priya Singh, Maharashtra' },
            { text: '"Buying resources through the app is so convenient. I get quality seeds and fertilizers delivered right to my farm."', author: 'Suresh Patel, Gujarat' },
          ].map((t, i) => (
            <div className="testimonial-card" key={i}>
              <p>{t.text}</p>
              <div className="testimonial-author">— {t.author}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Contact */}
      <section className="contact-section" id="contact">
        <h2>Contact Us</h2>
        <p>Have questions? We'd love to hear from you.</p>
        <div style={{ maxWidth: 500, margin: '0 auto' }}>
          <input className="contact-input" placeholder="Your Name" />
          <input className="contact-input" placeholder="Your Email" />
          <textarea className="contact-input" rows={4} placeholder="Your Message" style={{ resize: 'none' }} />
          <button className="btn-get-started" style={{ width: '100%' }}>Send Message</button>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">© 2026 Agri-Tech. All rights reserved.</footer>
    </div>
  );
}
