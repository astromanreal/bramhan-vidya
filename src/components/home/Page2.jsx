import "./Page2.css";

export default function Page2() {
  return (
    <>
      <section class="believe">
        <div class="container">
          <div class="believe-content">
            <h2>
              We believe that
              <br />
              creativity exists
              <br />
              in every person
            </h2>
            <p>
              Our goal is to cultivate that creativity and help
              <br />
              others create unique, thriving businesses that
              <br />
              make the world a better place.
            </p>
          </div>
          <img
            src="https://i.postimg.cc/D0bRyws5/puspak.jpg"
            alt="People Creating"
          />
        </div>
      </section>

      <section class="office">
        <h2>
          Here's how it goes down
          <br />
          at the office
        </h2>
        <p>WE'RE NO STRANGERS TO HARD WORK - NEITHER TO A GREAT TIME</p>
        <div class="container">
          <div class="team-card">
            <img
              src="https://i.postimg.cc/D0bRyws5/puspak.jpg"
              alt="Support Team"
            />
            <div class="team-info">
              <h3>Meet the Supp...</h3>
              <h4>Support Team</h4>
            </div>
          </div>
          <div class="team-card">
            <img
              src="https://i.postimg.cc/D0bRyws5/puspak.jpg"
              alt="Dev Team"
            />
            <div class="team-info">
              <h3>Meet the Prod...</h3>
              <h4>Dev Team</h4>
            </div>
          </div>
          <div class="team-card">
            <img
              src="https://i.postimg.cc/D0bRyws5/puspak.jpg"
              alt="Admin Team"
            />
            <div class="team-info">
              <h3>Meet the Adm...</h3>
              <h4>Admin Team</h4>
            </div>
          </div>
          <div class="team-card">
            <img
              src="https://i.postimg.cc/D0bRyws5/puspak.jpg"
              alt="Marketing Team"
            />
            <div class="team-info">
              <h3>Meet the Mark...</h3>
              <h4>Marketing Team</h4>
            </div>
          </div>
        </div>
      </section>

      <section class="yourself">
        <div class="container">
          <h2>
            See for yourself why we ❤️
            <br />
            working at Showit
          </h2>
          <p>CHECK OUT WHAT POSITIONS WE'RE CURRENTLY HIRING FOR</p>
          <button class="job-listings">VIEW JOB LISTINGS</button>
          <div class="arrow"></div>
        </div>
      </section>
    </>
  );
}
