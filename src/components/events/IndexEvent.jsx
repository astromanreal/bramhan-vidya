import GetRedirectLink from "../utils/GetRedirectLink";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import apiUrl from "../utils/GetApiUrl";
import axios from "axios";
import "./Event.css";

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
      .get(`${apiUrl}/event/allevents`)
      .then((response) => {
        setEvents(response.data);
      })
      .catch((error) => {
        alert(error.message);
      });
  }, []);

  return (
    <>
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
