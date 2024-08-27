import "./Page.css";

export default function Page() {
  return (
    <>
      <section class="hero">
        <img
          src="https://i.postimg.cc/D0bRyws5/puspak.jpg"
          alt="Lush Green Fields"
          class="hero-image"
        />
        <h1>TALENT IS EVERYWHERE</h1>
      </section>

      <section class="introduction">
        <p>
          Wherever you go in the world, you'll find talented people. But talent
          needs the opportunity to succeed. At The Greenrail Project, we work
          with talented agricultural growers worldwide, giving them the
          opportunity to grow and flourish.
        </p>
        <p>
          Our global programs provide the training, technology, accreditation,
          and global market access they need to grow their business, support
          their families and communities, and transform their futures.
        </p>
      </section>

      <section class="how-we-help">
        <h2>How we help talent grow</h2>
        <div class="help-cards">
          <div class="help-card">
            <img
              src="https://i.postimg.cc/D0bRyws5/puspak.jpg"
              alt="Commercial Training Icon"
              class="help-icon"
            />
            <h3>Commercial Training</h3>
            <p>
              Our programs enhance the entrepreneurs’ business acumen and
              recognition, arming them with the critical skills and guidance to
              expand into global markets.
            </p>
          </div>
          <div class="help-card">
            <img
              src="https://i.postimg.cc/D0bRyws5/puspak.jpg"
              alt="Technology Icon"
              class="help-icon"
            />
            <h3>Enabling Technology</h3>
            <p>
              Through strategic tech integration, we boost growers’ efficiency
              and innovation, enabling them to harness farming analytics, smart
              tracking, and cross-border sales.
            </p>
          </div>
          <div class="help-card">
            <img
              src="https://i.postimg.cc/D0bRyws5/puspak.jpg"
              alt="Accreditation Icon"
              class="help-icon"
            />
            <h3>Product Accreditation</h3>
            <p>
              We provide growers with the tools to meet the highest industry
              standards, from third-party verification to fair trade and organic
              certifications.
            </p>
          </div>
          <div class="help-card">
            <img
              src="https://i.postimg.cc/D0bRyws5/puspak.jpg"
              alt="Marketplace Connections Icon"
              class="help-icon"
            />
            <h3>Marketplace Connections</h3>
            <p>
              We connect agricultural entrepreneurs to global marketplaces,
              empowering them to secure profitable partnerships and cross-border
              sales opportunities.
            </p>
          </div>
        </div>
      </section>

      <section class="quote-section">
        <div class="quote-background">
          <p>
            “The Greenrail Project pays forward business skills and
            opportunities. By enabling entrepreneurs, we also preserve humanity
            and dignity, while uplifting future generations to grow and thrive.”
          </p>
          <cite>Archer No, Founder and CEO, The Greenrail Project</cite>
        </div>
      </section>

      <section class="values-section">
        <h2>Our five values</h2>
        <div class="values-list">
          <div class="value-item">
            <h3>1. INSPIRATION</h3>
            <p>
              We harness the power of inspiration to transform ideas into
              reality and positively impact our mission, partners, and
              communities.
            </p>
          </div>
          <div class="value-item">
            <h3>2. COLLABORATION</h3>
            <p>
              We believe that by working together, we can achieve more, building
              a collaborative ecosystem of success.
            </p>
          </div>
          <div class="value-item">
            <h3>3. COMPASSION</h3>
            <p>
              We act with empathy and kindness, always striving to uplift others
              and create meaningful change.
            </p>
          </div>
          <div class="value-item">
            <h3>4. EMPOWERMENT</h3>
            <p>
              We empower individuals and communities by providing the tools and
              opportunities they need to succeed.
            </p>
          </div>
          <div class="value-item">
            <h3>5. AUTHENTICITY</h3>
            <p>
              We stay true to our values and principles, always acting with
              integrity and honesty.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
