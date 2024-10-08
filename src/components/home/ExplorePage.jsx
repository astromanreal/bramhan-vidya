import { Link } from "react-router-dom";

export default function ExplorePage() {
  const weOffer = [
    {
      title: "Events",
      path: "event",
      subtitle: "Significant Occasions in Sanatan Dharma",
      desc: "Discover the major events and festivals that mark the spiritual calendar of Hinduism, celebrating divine moments and sacred traditions.",
      image: "https://i.postimg.cc/c43PptLh/events.jpg",
    },
    {
      title: "Topics",
      path: "topic",
      subtitle: "Delving into Hindu Philosophy",
      desc: "Gain a deeper understanding of the universe and human existence through the rich tapestry of Hindu philosophy, covering topics such as yoga, Vedanta, and the Upanishads.",
      image: "https://i.postimg.cc/GpXfFkXL/topics.jpg",
    },
    {
      title: "Technologies",
      path: "tech",
      subtitle: "Ancient Wisdom in Modern Times",
      desc: "Explore the intersection of traditional Hindu knowledge and modern technology, highlighting how ancient practices continue to influence today's world.",
      image: "https://i.postimg.cc/RZz24C3B/technology.jpg",
    },
    {
      title: "texts",
      path: "book",
      subtitle: "Sacred Scriptures of Hinduism",
      desc: "Hindu texts are ancient scriptures that encompass religious, philosophical, and cultural teachings, guiding the way of life, rituals, and spirituality for followers.",
      image: "https://i.postimg.cc/cHj5jdqP/books.jpg",
    },
    {
      title: "Profiles",
      path: "profile",
      subtitle: "Inspirational Personalities of Sanatan Dharma",
      desc: "Explore the lives and teachings of revered Hindu sages, gurus, and avatars who have shaped the spiritual landscape of India.",
      image: "https://i.postimg.cc/V65VDdhj/profiles.jpg",
    },
    {
      title: "Places",
      path: "place",
      subtitle: "Sacred Sites of Spiritual Significance",
      desc: "Discover the ancient temples, pilgrimage sites, and ashrams that embody the spiritual essence of Hinduism and attract seekers from around the world.",
      image: "https://i.postimg.cc/qq3ZHW4q/places.jpg",
    },
    {
      title: "Festivals",
      path: "festival",
      subtitle: "Celebrating Divine Moments",
      desc: "Explore the vibrant festivals and sacred occasions that mark the Hindu spiritual calendar, each with its unique significance and traditions.",
      image: "https://i.postimg.cc/4xG9QPVm/festivals.jpg",
    },
    {
      title: "Temples",
      path: "temple",
      subtitle: "Sacred Abodes of the Divine",
      desc: "Visit the ancient and revered temples that embody the spiritual essence of Hinduism, each with its unique architecture and historical significance.",
      image: "https://i.postimg.cc/BZdDX4v5/temples.jpg",
    },
    {
      title: "Organisations",
      path: "organisation",
      subtitle: "Institutions Preserving Hindu Heritage",
      desc: "Discover the esteemed organisations and institutions dedicated to preserving and promoting Hindu culture, philosophy, and traditions.",
      image: "https://i.postimg.cc/TYgbbFyz/organisations.jpg",
    },
    {
      title: "Blogs",
      path: "blog",
      subtitle: "Insights into Sanatan Dharma",
      desc: "Dive into a wealth of knowledge with articles and discussions on the principles, practices, and philosophies that define Hinduism.",
      image: "https://i.postimg.cc/1RndFVwS/blogs.jpg",
    },
  ];
  return (
    <>
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
      <div
        className="HomeOffer-col"
        ontouchstart="this.classList.toggle('hover');"
      >
        <div className="HomeOffer-container">
          <div
            className="HomeOffer-front"
            style={{
              backgroundImage: `url(${data.image})`,
            }}
          >
            <div className="HomeOffer-inner">
              <p>{data.title}</p>
              <span>{data.subtitle}</span>
            </div>
          </div>
          <div className="HomeOffer-back">
            <div className="HomeOffer-inner">
              <Link to={`/${data.path}`}>
                <p>{data.desc}</p>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
