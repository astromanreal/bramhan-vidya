import GetRedirectLink from "../utils/GetRedirectLink";
import { useState, useEffect } from "react";
import axios from "axios";
import "./Event.css";
import { useNavigate } from "react-router-dom";

export default function IndexEvent() {
  return (
    <>
      <AllEvents />
      <GetRedirectLink text="Event" path="add" />
    </>
  );
}

export function AllEvents() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    axios
      .get("https://bramhan-vidya-api.vercel.app/event/allevents")
      .then((response) => {
        setEvents(response.data);
      })
      .catch((error) => {
        alert(error.message);
      });
  }, []);

  return (
    <>
      <h1>List of all events</h1>
      <div className="event-card-container">
        {events.map((event) => (
          <EventCard data={event} />
        ))}
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
