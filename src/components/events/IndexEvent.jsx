import GetRedirectLink from "../utils/GetRedirectLink";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import apiUrl from "../utils/GetApiUrl";
import axios from "axios";
import "./Event.css";
import { Helmet } from "react-helmet";

export default function IndexEvent() {
  return (
    <>
      <Helmet>
        <title>Events in Hinduism: A Comprehensive Guide</title>
        <meta
          name="description"
          content="Explore the significance and dates of various Hindu events, festivals, and rituals. Learn about the cultural and spiritual importance of these occasions."
        />
        <meta
          name="keywords"
          content="Hindu events, Hindu festivals, Hindu rituals, Diwali, Holi, Navratri, Puja, Yajna, Samskara"
        />
        <meta
          name="og:title"
          content="Hindu Events, Festivals, and Rituals: A Comprehensive Guide"
        />
        <meta
          name="og:description"
          content="Discover the richness of Hindu culture and spirituality through its various events, festivals, and rituals."
        />
        <meta name="og:url" content="https://bramhan-vidya.vercel.app/event" />

        <meta
          property="og:image"
          content="https://i.postimg.cc/8k20mkm6/places-alt-image.jpg"
        />
        <meta
          name="twitter:image"
          content="https://i.postimg.cc/8k20mkm6/places-alt-image.jpg"
        />

        <meta
          name="twitter:title"
          content="Hindu Events, Festivals, and Rituals: A Comprehensive Guide"
        />
        <meta
          name="twitter:description"
          content="Learn about the significance and dates of various Hindu events, festivals, and rituals."
        />
      </Helmet>
      <AllEvents />
      <GetRedirectLink text="Event" path="add" />
    </>
  );
}
export function AllEvents() {
  const [events, setEvents] = useState([]);
  const [selectedReference, setSelectedReference] = useState("All");
  const [references, setReferences] = useState([]);

  useEffect(() => {
    const fetchAllEvents = async () => {
      try {
        const response = await axios.get(`${apiUrl}/event/allevents`);
        setEvents(response.data);
        const uniqueReferences = [
          ...new Set(response.data.map((event) => event.reference)),
        ];
        setReferences(["All", ...uniqueReferences]);
      } catch (error) {
        alert(error.message || "Error while getting the Data");
      }
    };
    fetchAllEvents();
  }, []);

  const handleReferenceChange = (event) => {
    setSelectedReference(event.target.value);
  };

  const filteredEvents =
    selectedReference === "All"
      ? events
      : events.filter((event) => event.reference === selectedReference);

  return (
    <>
      <div className="filter-data-container">
        <select value={selectedReference} onChange={handleReferenceChange}>
          {references.map((reference) => (
            <option key={reference} value={reference}>
              {reference}
            </option>
          ))}
        </select>
      </div>

      <div className="event-card-container">
        {filteredEvents.length > 0 ? (
          filteredEvents.map((event) => (
            <EventCard key={event._id} data={event} />
          ))
        ) : (
          <p>No events found in this reference</p>
        )}
      </div>
    </>
  );
}

export function EventCard({ data }) {
  const navigate = useNavigate();
  return (
    <>
      <div className="event-card">
        <img
          src={data.image || "https://i.postimg.cc/D0bRyws5/puspak.jpg"}
          alt={data.name}
        />
        <div className="event-card-content">
          <h2>{data.name}</h2>
          <p>
            {data.description.substring(0, 50)}
            {data.description.length > 50 ? "..." : ""}
          </p>
          <button
            onClick={() => {
              navigate(data._id);
            }}
          >
            Learn more
          </button>
        </div>
      </div>
    </>
  );
}
