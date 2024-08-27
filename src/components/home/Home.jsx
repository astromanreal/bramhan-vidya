// import Card from "./Card";
import "./Home.css";
import { Link } from "react-router-dom";
// import Page from "./Page";
// import Page2 from "./Page2";

export default function Home() {
  const weOffer = [
    {
      title: "Events",
      path: "event",
      subtitle: "Significant Occasions in Sanatan Dharma",
      desc: "Discover the major events and festivals that mark the spiritual calendar of Hinduism, celebrating divine moments and sacred traditions.",
      image: "https://i.postimg.cc/fRY0T4Fh/Draupadi.webp",
    },
    {
      title: "Blogs",
      path: "blog",
      subtitle: "Insights into Sanatan Dharma",
      desc: "Dive into a wealth of knowledge with articles and discussions on the principles, practices, and philosophies that define Hinduism.",
      image: "https://i.postimg.cc/3xrVB7TK/blog.jpg",
    },
    {
      title: "Technologies",
      path: "tech",
      subtitle: "Ancient Wisdom in Modern Times",
      desc: "Explore the intersection of traditional Hindu knowledge and modern technology, highlighting how ancient practices continue to influence today's world.",
      image: "https://i.postimg.cc/D0bRyws5/puspak.jpg",
    },
    {
      title: "Profiles",
      path: "profile",
      subtitle: "Inspirational Personalities of Sanatan Dharma",
      desc: "Explore the lives and teachings of revered Hindu sages, gurus, and avatars who have shaped the spiritual landscape of India.",
      image:
        "https://i.pinimg.com/originals/8e/fc/e5/8efce5baeb406394f8d6e44804f1f488.jpg",
    },
    {
      title: "texts",
      path: "book",
      subtitle: "Sacred Scriptures of Hinduism",
      desc: "Hindu texts are ancient scriptures that encompass religious, philosophical, and cultural teachings, guiding the way of life, rituals, and spirituality for followers.",
      image: "https://wallpapercave.com/mwp/wp2036897.jpg",
    },
    {
      title: "Places",
      path: "place",
      subtitle: "Sacred Sites of Spiritual Significance",
      desc: "Discover the ancient temples, pilgrimage sites, and ashrams that embody the spiritual essence of Hinduism and attract seekers from around the world.",
      image:
        "https://images.pexels.com/photos/672630/pexels-photo-672630.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    },
    {
      title: "Topics",
      path: "topic",
      subtitle: "Sacred Offering.",
      desc: "Delve into the rich tapestry of Hindu philosophy, covering topics such as yoga, Vedanta, and the Upanishads, to gain a deeper understanding of the universe and human existence.",
      image:
        "https://galleryofgod.files.wordpress.com/2014/06/puja-arti-e1404052877819.jpg?w=672&h=372&crop=1",
    },
  ];
  return (
    <>
      {/* <Page2 />
      <Page />
      <Card /> */}
      <div id="home-offer-holder">
        {weOffer.map((i) => {
          return <HomeOffer data={i} />;
        })}
      </div>
    </>
  );
}

export function HomeOffer({ data }) {
  return (
    <>
      <div class="HomeOffer-col" ontouchstart="this.classList.toggle('hover');">
        <div class="HomeOffer-container">
          <div
            class="HomeOffer-front"
            style={{
              backgroundImage: `url(${data.image})`,
            }}
          >
            <div class="HomeOffer-inner">
              <p>{data.title}</p>
              <span>{data.subtitle}</span>
            </div>
          </div>
          <div class="HomeOffer-back">
            <div class="HomeOffer-inner">
              <Link to={data.path}>
                <p>{data.desc}</p>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
