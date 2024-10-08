import "./About.css";

export default function About() {
  return (
    <>
      <main>
        <section className="about-us">
          <p>
            Welcome to Sanandharma Hinduism, a digital platform dedicated to
            promoting the principles and practices of Hinduism.
          </p>
          <p>
            Our mission is to provide a comprehensive resource for individuals
            seeking to deepen their understanding and connection with Hinduism.
          </p>
        </section>
        <section className="HomeHeader-how-we-help">
          <h2>How we guide your spiritual journey</h2>
          <div className="HomeHeader-help-cards">
            <div className="HomeHeader-help-card">
              <img
                src="https://i.postimg.cc/2jW77Q6z/personal-growth.jpg"
                alt="Personal Growth Icon"
                className="HomeHeader-help-icon"
              />
              <h3>Personal Growth</h3>
              <p>
                Discover practical wisdom and spiritual practices to enhance
                your daily life, cultivating inner peace, and self-awareness.
              </p>
            </div>
            <div className="HomeHeader-help-card">
              <img
                src="https://i.postimg.cc/gj3ycW5w/community-support.jpg"
                alt="Community Support Icon"
                className="HomeHeader-help-icon"
              />
              <h3>Community Support</h3>
              <p>
                Connect with like-minded individuals and spiritual seekers,
                sharing knowledge, experiences, and growth.
              </p>
            </div>

            <div className="HomeHeader-help-card">
              <img
                src="https://i.postimg.cc/FRdgqcVV/authentic-source.jpg"
                alt="Spiritual Guidance Icon"
                className="HomeHeader-help-icon"
              />
              <h3>Authentic Resources</h3>
              <p>
                Access a vast library of sacred texts, scriptures, and spiritual
                teachings from renowned gurus and scholars.
              </p>
            </div>
            <div className="HomeHeader-help-card">
              <img
                src="https://i.postimg.cc/QxkgRj1w/cultural-heritage.jpg"
                alt="Cultural Heritage Icon"
                className="HomeHeader-help-icon"
              />
              <h3>Cultural Heritage</h3>
              <p>
                Explore the rich cultural heritage of Hinduism, including its
                history, art, architecture, and festivals.
              </p>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
