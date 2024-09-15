import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import GetUserId from "../utils/GetUserId";
import toast from "react-hot-toast";
import apiUrl from "../utils/GetApiUrl";
import axios from "axios";

export default function UpdateTemple() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [temple, setTemple] = useState({
    name: "",
    userId: GetUserId(),
    image: "",
    description: "",
    alternateNames: [""],
    location: {
      address: "",
      city: "",
      state: "",
      country: "",
      latitude: 0,
      longitude: 0,
    },
    deity: {
      mainDeity: "",
      otherDeities: [""],
    },
    type: "",
    architecture: {
      style: "",
      era: "",
      features: "",
    },
    history: {
      builtBy: "",
      builtIn: "",
      significantEvent: "",
    },
    festivals: "",
    timings: {
      openingTime: "",
      closingTime: "",
    },
    contactInformation: {
      phone: "",
      email: "",
      website: "",
    },
    randomKeyDetails: [
      {
        key: "",
        value: "",
      },
    ],
    notes: [
      {
        key: "",
        value: "",
      },
    ],
  });

  useEffect(() => {
    axios
      .get(`${apiUrl}/temples/temple/${id}`)
      .then((response) => {
        setTemple(response.data);
      })
      .catch((error) => {
        toast.error(error.message);
      });
  }, [id]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    if (
      name === "address" ||
      name === "city" ||
      name === "state" ||
      name === "country" ||
      name === "latitude" ||
      name === "longitude"
    ) {
      setTemple((prevTemple) => ({
        ...prevTemple,
        location: { ...prevTemple.location, [name]: value },
      }));
    } else if (name === "mainDeity" || name === "otherDeities") {
      setTemple((prevTemple) => ({
        ...prevTemple,
        deity: { ...prevTemple.deity, [name]: value },
      }));
    } else if (name === "style" || name === "era" || name === "features") {
      setTemple((prevTemple) => ({
        ...prevTemple,
        architecture: { ...prevTemple.architecture, [name]: value },
      }));
    } else if (
      name === "builtBy" ||
      name === "builtIn" ||
      name === "significantEvent"
    ) {
      setTemple((prevTemple) => ({
        ...prevTemple,
        history: { ...prevTemple.history, [name]: value },
      }));
    } else if (name === "openingTime" || name === "closingTime") {
      setTemple((prevTemple) => ({
        ...prevTemple,
        timings: { ...prevTemple.timings, [name]: value },
      }));
    } else if (name === "phone" || name === "email" || name === "website") {
      setTemple((prevTemple) => ({
        ...prevTemple,
        contactInformation: { ...prevTemple.contactInformation, [name]: value },
      }));
    } else {
      setTemple({ ...temple, [name]: value });
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const filteredTemple = {
      ...temple,
      alternateNames: temple.alternateNames.filter((name) => name),
      otherDeities: temple.deity.otherDeities.filter((deity) => deity),
      randomKeyDetails: temple.randomKeyDetails.filter(
        (detail) => detail.key && detail.value
      ),
      notes: temple.notes.filter((note) => note.key || note.value),
    };
    try {
      const response = await axios.put(
        `${apiUrl}/temples/temple/${id}`,
        filteredTemple
      );
      if (response.status === 200) {
        toast.success("Temple updated successfully!");
        navigate("/temple");
      } else {
        toast.error("Failed to update temple!");
      }
    } catch (error) {
      toast.error(error.message);
      if (error.response.status === 400) {
        toast.error(error.response.data.message);
      } else {
        toast.error("An unexpected error occurred. Please try again.");
      }
    }
  };

  const handleRandomKeyDetailsChange = (event, index) => {
    const { name, value } = event.target;
    setTemple((prevTemple) => ({
      ...prevTemple,
      randomKeyDetails: prevTemple.randomKeyDetails.map((detail, i) =>
        i === index ? { ...detail, [name]: value } : detail
      ),
    }));
  };

  const addRandomKeyDetail = () => {
    setTemple((prevTemple) => ({
      ...prevTemple,
      randomKeyDetails: [
        ...prevTemple.randomKeyDetails,
        { key: "", value: "" },
      ],
    }));
  };

  const handleNotesChange = (index, noteType, value) => {
    const updatedNotes = [...temple.notes];
    if (!updatedNotes[index]) {
      updatedNotes[index] = {};
    }
    updatedNotes[index][noteType] = value;
    setTemple({ ...temple, notes: updatedNotes });
  };

  const handleAddNote = () => {
    setTemple({
      ...temple,
      notes: [...temple.notes, { key: "", value: "" }],
    });
  };

  const templeTypes = [
    "Shiva",
    "Vaishnava",
    "Shakti",
    "Surya",
    "Ganapati",
    "Hanuman",
    "Mixed",
    "Others",
  ];

  return (
    <>
      <form onSubmit={handleSubmit} id="add-profile-form">
        <h1>Update Temple</h1>
        <div>
          <label>Name:</label>
          <input
            type="text"
            name="name"
            required
            value={temple.name}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Image:</label>
          <input
            type="text"
            name="image"
            value={temple.image}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Description:</label>
          <textarea
            name="description"
            value={temple.description}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Alternate Names:</label>
          {temple.alternateNames.map((name, index) => (
            <input
              key={index}
              type="text"
              name="alternateNames"
              value={name}
              onChange={(event) =>
                setTemple((prevTemple) => ({
                  ...prevTemple,
                  alternateNames: prevTemple.alternateNames.map((n, i) =>
                    i === index ? event.target.value : n
                  ),
                }))
              }
            />
          ))}
          <button
            type="button"
            onClick={() =>
              setTemple((prevTemple) => ({
                ...prevTemple,
                alternateNames: [...prevTemple.alternateNames, ""],
              }))
            }
          >
            Add More Alternate Names
          </button>
        </div>
        <div>
          <label>Location:</label>
          <div>
            <label>Address:</label>
            <input
              type="text"
              name="address"
              value={temple.location.address}
              onChange={handleChange}
            />
          </div>
          <div>
            <label>City:</label>
            <input
              type="text"
              name="city"
              value={temple.location.city}
              onChange={handleChange}
            />
          </div>
          <div>
            <label>State:</label>
            <input
              type="text"
              name="state"
              value={temple.location.state}
              onChange={handleChange}
            />
          </div>
          <div>
            <label>Country:</label>
            <input
              type="text"
              name="country"
              value={temple.location.country}
              onChange={handleChange}
            />
          </div>
          <div>
            <label>Latitude:</label>
            <input
              type="number"
              name="latitude"
              value={temple.location.latitude}
              onChange={handleChange}
            />
          </div>
          <div>
            <label>Longitude:</label>
            <input
              type="number"
              name="longitude"
              value={temple.location.longitude}
              onChange={handleChange}
            />
          </div>
        </div>
        <div>
          <label>Deity:</label>
          <div>
            <label>Main Deity:</label>
            <input
              type="text"
              name="mainDeity"
              value={temple.deity.mainDeity}
              onChange={handleChange}
            />
          </div>
          <div>
            <label>Other Deities:</label>
            {temple.deity.otherDeities.map((deity, index) => (
              <input
                key={index}
                type="text"
                name="otherDeities"
                value={deity}
                onChange={(event) =>
                  setTemple((prevTemple) => ({
                    ...prevTemple,
                    deity: {
                      ...prevTemple.deity,
                      otherDeities: prevTemple.deity.otherDeities.map((d, i) =>
                        i === index ? event.target.value : d
                      ),
                    },
                  }))
                }
              />
            ))}
            <button
              type="button"
              onClick={() =>
                setTemple((prevTemple) => ({
                  ...prevTemple,
                  deity: {
                    ...prevTemple.deity,
                    otherDeities: [...prevTemple.deity.otherDeities, ""],
                  },
                }))
              }
            >
              Add More Other Deities
            </button>
          </div>
        </div>

        <div>
          <label>Type:</label>
          <select
            name="type"
            required
            value={temple.type}
            onChange={handleChange}
          >
            <option value="">Select Type</option>
            {templeTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label>Architecture:</label>
          <div>
            <label>Style:</label>
            <input
              type="text"
              name="style"
              value={temple.architecture.style}
              onChange={handleChange}
            />
          </div>
          <div>
            <label>Era:</label>
            <input
              type="text"
              name="era"
              value={temple.architecture.era}
              onChange={handleChange}
            />
          </div>
          <div>
            <label>Features:</label>
            <input
              type="text"
              name="features"
              value={temple.architecture.features}
              onChange={handleChange}
            />
          </div>
        </div>

        <div>
          <label>History:</label>
          <div>
            <label>Built By:</label>
            <input
              type="text"
              name="builtBy"
              value={temple.history.builtBy}
              onChange={handleChange}
            />
          </div>
          <div>
            <label>Built In:</label>
            <input
              type="text"
              name="builtIn"
              value={temple.history.builtIn}
              onChange={handleChange}
            />
          </div>
          <div>
            <label>Significant Event:</label>
            <input
              type="text"
              name="significantEvent"
              value={temple.history.significantEvent}
              onChange={handleChange}
            />
          </div>
        </div>
        <div>
          <label>Festivals:</label>
          <input
            type="text"
            name="festivals"
            value={temple.festivals}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Timings:</label>
          <div>
            <label>Opening Time:</label>
            <input
              type="text"
              name="openingTime"
              value={temple.timings.openingTime}
              onChange={handleChange}
            />
          </div>
          <div>
            <label>Closing Time:</label>
            <input
              type="text"
              name="closingTime"
              value={temple.timings.closingTime}
              onChange={handleChange}
            />
          </div>
        </div>
        <div>
          <label>Contact Information:</label>
          <div>
            <label>Phone:</label>
            <input
              type="text"
              name="phone"
              value={temple.contactInformation.phone}
              onChange={handleChange}
            />
          </div>
          <div>
            <label>Email:</label>
            <input
              type="email"
              name="email"
              value={temple.contactInformation.email}
              onChange={handleChange}
            />
          </div>
          <div>
            <label>Website:</label>
            <input
              type="text"
              name="website"
              value={temple.contactInformation.website}
              onChange={handleChange}
            />
          </div>
        </div>
        <div>
          <label>Random Key Details:</label>
          {temple.randomKeyDetails.map((detail, index) => (
            <div key={index}>
              <input
                type="text"
                name="key"
                value={detail.key}
                onChange={(event) => handleRandomKeyDetailsChange(event, index)}
              />
              <input
                type="text"
                name="value"
                value={detail.value}
                onChange={(event) => handleRandomKeyDetailsChange(event, index)}
              />
            </div>
          ))}
          <button type="button" onClick={addRandomKeyDetail}>
            Add More Random Key Details
          </button>
        </div>
        <div>
          <label>Notes:</label>
          {temple.notes.map((note, index) => (
            <div key={index}>
              <input
                type="text"
                name="key"
                value={note.key}
                onChange={(event) =>
                  handleNotesChange(index, "key", event.target.value)
                }
              />
              <input
                type="text"
                name="value"
                value={note.value}
                onChange={(event) =>
                  handleNotesChange(index, "value", event.target.value)
                }
              />
            </div>
          ))}
          <button type="button" onClick={handleAddNote}>
            Add More Notes
          </button>
        </div>
        <button type="submit">Submit</button>
      </form>
    </>
  );
}
