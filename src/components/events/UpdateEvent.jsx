import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";

export default function UpdateEvent() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [event, setEvent] = useState({
    name: "",
    description: "",
    image: "",
    reference: "",
    category: "",
    likes: {
      count: 0,
      users: [],
    },
    comments: {
      comments: [],
      count: 0,
    },
  });

  const [randomKeyDetails, setRandomKeyDetails] = useState([
    {
      key: "",
      value: "",
    },
  ]);

  const handleInputChange = (e) => {
    setEvent({ ...event, [e.target.name]: e.target.value });
  };

  const handleRandomKeyDetailsChange = (e, index) => {
    const updatedRandomKeyDetails = [...randomKeyDetails];
    updatedRandomKeyDetails[index][e.target.name] = e.target.value;
    setRandomKeyDetails(updatedRandomKeyDetails);
  };

  const addRandomKeyDetail = () => {
    setRandomKeyDetails([...randomKeyDetails, { key: "", value: "" }]);
  };

  const removeRandomKeyDetail = (index) => {
    setRandomKeyDetails(randomKeyDetails.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const updatedEvent = {
      ...event,
      randomKeyDetails: randomKeyDetails.filter(
        (detail) => detail.key && detail.value
      ),
    };
    try {
      await axios.put(
        `https://bramhan-vidya-api.vercel.app/event/event/${id}`,
        updatedEvent
      );
      toast.success("Event updated successfully");
      navigate(`/event/${id}`);
    } catch (error) {
      toast.error(error.message);
      if (error.response.status === 400) {
        toast.error("Event with same name already exists");
      } else {
        toast.error("Failed to update event");
      }
    }
  };

  useEffect(() => {
    axios
      .get(`https://bramhan-vidya-api.vercel.app/event/event/${id}`)
      .then((response) => {
        setEvent(response.data);
        setRandomKeyDetails(response.data.randomKeyDetails);
      })
      .catch((error) => {
        toast.error(error.message);
      });
  }, [id]);

  return (
    <>
      <form onSubmit={handleSubmit} className="add-event-form">
        <h1>Update event</h1>
        <div>
          <label>Name:</label>
          <input
            type="text"
            name="name"
            required
            value={event.name}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>Description:</label>
          <textarea
            name="description"
            required
            value={event.description}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>Image:</label>
          <input
            type="text"
            name="image"
            value={event.image}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>Reference:</label>
          <input
            type="text"
            name="reference"
            value={event.reference}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>Category:</label>
          <select
            name="category"
            required
            value={event.category}
            onChange={handleInputChange}
          >
            <option value="">Select category</option>
            <option value="Divine Interventions">Divine Interventions</option>
            <option value="Cosmic Events">Cosmic Events</option>
            <option value="Royal Coronations">Royal Coronations</option>
            <option value="Legendary Quests">Legendary Quests</option>
            <option value="Spiritual Awakenings">Spiritual Awakenings</option>
            <option value="Mythical Creatures">Mythical Creatures</option>
            <option value="Ancient Innovations">Ancient Innovations</option>
            <option value="Philosophical Debates">Philosophical Debates</option>
            <option value="Festivals of Light">Festivals of Light</option>
            <option value="Celestial Alignments">Celestial Alignments</option>
            <option value="Sacred Pilgrimages">Sacred Pilgrimages</option>
            <option value="Hidden Treasures">Hidden Treasures</option>
            <option value="Forgotten Knowledges">Forgotten Knowledges</option>
            <option value="Mystical Union">Mystical Union</option>
            <option value="Cosmic Dance">Cosmic Dance</option>
            <option value="Eternal Love Stories">Eternal Love Stories</option>
            <option value="Timeless Wisdom">Timeless Wisdom</option>
            <option value="Miscellaneous">Miscellaneous</option>
            <option value="Others">Others</option>
          </select>
        </div>
        <div className="random-key-details">
          <label>Random Key Details:</label>
          {randomKeyDetails.map((detail, index) => (
            <div key={index}>
              <input
                type="text"
                name="key"
                value={detail.key}
                onChange={(e) => handleRandomKeyDetailsChange(e, index)}
              />
              <input
                type="text"
                name="value"
                value={detail.value}
                onChange={(e) => handleRandomKeyDetailsChange(e, index)}
              />
              <button
                type="button"
                onClick={() => removeRandomKeyDetail(index)}
                className="remove-button"
              >
                Remove
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={addRandomKeyDetail}
            className="add-more-button"
          >
            Add more
          </button>
        </div>
        <button type="submit" className="submit-button">
          Update event
        </button>
      </form>
    </>
  );
}
