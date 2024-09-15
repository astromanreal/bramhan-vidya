import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import apiUrl from "../utils/GetApiUrl";

export default function UpdateOrganisation() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [organisation, setOrganisation] = useState({
    organisationName: "",
    image: "",
    description: "",
    type: "",
    foundingYear: "",
    founder: "",
    headquarter: "",
    objective: "",
    contactInformation: {
      website: "",
      phone: "",
      email: "",
      address: "",
    },
    notableFigures: "",
    controversies: "",
    achievements: "",
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
    const fetchOrganisation = async () => {
      try {
        const response = await axios.get(
          `${apiUrl}/organisations/organisation/${id}`
        );
        setOrganisation(response.data);
      } catch (error) {
        toast.error(error.message);
      }
    };
    fetchOrganisation();
  }, [id]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    if (
      name === "website" ||
      name === "phone" ||
      name === "email" ||
      name === "address"
    ) {
      setOrganisation((prevOrg) => ({
        ...prevOrg,
        contactInformation: { ...prevOrg.contactInformation, [name]: value },
      }));
    } else {
      setOrganisation({ ...organisation, [name]: value });
    }
  };

  const handleRandomKeyDetailsChange = (event, index) => {
    const { name, value } = event.target;
    setOrganisation((prevOrg) => ({
      ...prevOrg,
      randomKeyDetails: prevOrg.randomKeyDetails.map((detail, i) =>
        i === index ? { ...detail, [name]: value } : detail
      ),
    }));
  };

  const handleNotesChange = (index, noteType, value) => {
    const updatedNotes = [...organisation.notes];
    if (!updatedNotes[index]) {
      updatedNotes[index] = {};
    }
    updatedNotes[index][noteType] = value;
    setOrganisation({ ...organisation, notes: updatedNotes });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.put(
        `${apiUrl}/organisations/organisation/${id}`,
        organisation
      );
      if (response.status === 200) {
        toast.success("Organisation updated successfully!");
        navigate("/organisation");
      } else {
        toast.error("Failed to update organisation!");
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit} id="add-profile-form">
        <h1>Update Organisation</h1>
        <div>
          <label>Organisation Name:</label>
          <input
            type="text"
            name="organisationName"
            required
            value={organisation.organisationName}
          />
        </div>
        <div>
          <label>Image:</label>
          <input
            type="text"
            name="image"
            value={organisation.image}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Description:</label>
          <textarea
            name="description"
            value={organisation.description}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Type:</label>
          <select
            name="type"
            required
            value={organisation.type}
            onChange={handleChange}
          >
            <option value="">Select Type</option>
            <option value="Political">Political</option>
            <option value="Social">Social</option>
            <option value="Religious">Religious</option>
            <option value="Cultural">Cultural</option>
            <option value="Educational">Educational</option>
            <option value="Charitable">Charitable</option>
            <option value="Others">Others</option>
          </select>
        </div>
        <div>
          <label>Founding Year:</label>
          <input
            type="text"
            name="foundingYear"
            value={organisation.foundingYear}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Founder:</label>
          <input
            type="text"
            name="founder"
            value={organisation.founder}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Headquarter:</label>
          <input
            type="text"
            name="headquarter"
            value={organisation.headquarter}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Objective:</label>
          <textarea
            name="objective"
            value={organisation.objective}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Contact Information:</label>
          <div>
            <label>Website:</label>
            <input
              type="text"
              name="website"
              value={organisation.contactInformation.website}
              onChange={handleChange}
            />
          </div>
          <div>
            <label>Phone:</label>
            <input
              type="text"
              name="phone"
              value={organisation.contactInformation.phone}
              onChange={handleChange}
            />
          </div>
          <div>
            <label>Email:</label>
            <input
              type="text"
              name="email"
              value={organisation.contactInformation.email}
              onChange={handleChange}
            />
          </div>
          <div>
            <label>Address:</label>
            <input
              type="text"
              name="address"
              value={organisation.contactInformation.address}
              onChange={handleChange}
            />
          </div>
        </div>
        <div>
          <label>Notable Figures:</label>
          <input
            type="text"
            name="notableFigures"
            value={organisation.notableFigures}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Controversies:</label>
          <input
            type="text"
            name="controversies"
            value={organisation.controversies}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Achievements:</label>
          <input
            type="text"
            name="achievements"
            value={organisation.achievements}
            onChange={handleChange}
          />
        </div>
        <div className="add-topic-container">
          <h2>Random Key Details:</h2>
          {organisation.randomKeyDetails.map((detail, index) => (
            <div key={index}>
              <label>Key: </label>
              <input
                type="text"
                name="key"
                value={detail.key}
                onChange={(event) => handleRandomKeyDetailsChange(event, index)}
              />
              <label>Value: </label>
              <input
                type="text"
                name="value"
                value={detail.value}
                onChange={(event) => handleRandomKeyDetailsChange(event, index)}
              />
            </div>
          ))}
          <button
            type="button"
            onClick={() =>
              setOrganisation({
                ...organisation,
                randomKeyDetails: [
                  ...organisation.randomKeyDetails,
                  { key: "", value: "" },
                ],
              })
            }
          >
            Add More Key Details
          </button>
        </div>
        <div id="profile-add-notes">
          <h2>Notes:</h2>
          {organisation.notes.map((note, index) => (
            <div key={index}>
              <input
                type="text"
                name={`notes-${index}-key`}
                value={note.key}
                onChange={(e) =>
                  handleNotesChange(index, "key", e.target.value)
                }
              />
              <textarea
                name={`notes-${index}-value`}
                value={note.value}
                onChange={(e) =>
                  handleNotesChange(index, "value", e.target.value)
                }
              />
            </div>
          ))}
          <button
            type="button"
            onClick={() =>
              setOrganisation({
                ...organisation,
                notes: [...organisation.notes, { key: "", value: "" }],
              })
            }
          >
            Add More Notes
          </button>
        </div>
        <button type="submit">Update Organisation</button>
      </form>
    </>
  );
}
