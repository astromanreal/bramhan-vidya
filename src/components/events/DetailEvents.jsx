import { useNavigate, useParams, Link } from "react-router-dom";
import GetRedirectLink from "../utils/GetRedirectLink";
import { useState, useEffect } from "react";
import GetUserId from "../utils/GetUserId";
import toast from "react-hot-toast";
import apiUrl from "../utils/GetApiUrl";
import axios from "axios";

export default function DetailEvents() {
  const [event, setEvent] = useState({});
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`${apiUrl}/event/event/${id}`)
      .then((response) => {
        setEvent(response.data);
      })
      .catch((error) => {
        toast.error(error.message);
      });
  }, [id]);

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this Event?")) {
      try {
        const response = await axios.delete(`${apiUrl}/event/event/${id}`);
        if (response.status === 204) {
          toast.success("Event deleted successfully");
          navigate("/event");
        } else {
          throw new Error("Failed to delete Event");
        }
      } catch (err) {
        toast.error(
          err.message || "An error occurred while deleting the Event"
        );
      }
    }
  };

  return (
    <>
      <div className="event-detail-container">
        <h1 className="event-heading">{event.name}</h1>
        <p className="event-desc">{event.description}</p>
        <p className="event-info">
          👁️ : {event.views} | ✎ :{" "}
          {new Date(event.updatedAt).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}{" "}
          |⌚ :{" "}
          {new Date(event.updatedAt).toLocaleTimeString("en-US", {
            hour: "2-digit",
            minute: "2-digit",
            hour12: true,
          })}
        </p>{" "}
        <hr />
        <div className="event-detail-list">
          <p>
            {event.randomKeyDetails?.map((detail, index) => (
              <li key={index}>
                {/* <span> */}
                <strong> {detail.key} : </strong> {detail.value}
                {/* </span> */}
              </li>
            ))}
          </p>
          <p>
            <strong>Reference : </strong> {event.reference}
          </p>
          <p>
            <strong>Category : </strong> {event.category}
          </p>
        </div>
        <hr />
        {GetUserId() === (event && event.userId) && (
          <div className="event-update-delete-btn">
            <Link to={`/event/update/${id}`}>
              <button>Update Data</button>
            </Link>
            <button onClick={handleDelete}>Delete Data</button>
          </div>
        )}
        <GetAllEventNotes />
        <GetRedirectLink text="note" path="add-note" />
      </div>
    </>
  );
}

export function GetAllEventNotes() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [eventNotes, setEventNotes] = useState({ notes: [] });

  useEffect(() => {
    const fetchEventNotes = async () => {
      try {
        const { data } = await axios.get(`${apiUrl}/event/${id}/allnotes`);
        setEventNotes(data);
      } catch (error) {
        toast.error(error);
      }
    };
    fetchEventNotes();
  }, [id]);

  return (
    <>
      <div className="event-notes-container">
        <h2>"Discover Key Takeaways and Notes for Event"</h2>
        {eventNotes.length > 0 ? (
          <>
            {eventNotes.map((note, index) => (
              <li key={note._id} className="event-notes-list">
                <h2
                  onClick={() => {
                    navigate(`/event/note/${note._id}`);
                  }}
                >
                  {index + 1}. {note.notes.title}
                </h2>
                <p> {note.notes.description[0]}</p> <hr />
              </li>
            ))}
          </>
        ) : (
          <p>No event notes found</p>
        )}
      </div>
    </>
  );
}
