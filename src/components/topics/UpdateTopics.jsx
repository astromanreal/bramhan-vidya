import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import GetUserId from "../utils/GetUserId";
import toast from "react-hot-toast";
import axios from "axios";

export default function UpdateTopics() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [topic, setTopic] = useState({
    name: "",
    description: "",
    randomKeyDetails: [{ key: "", value: "" }],
    lists: [{ listName: "", items: [""] }],
  });

  useEffect(() => {
    axios
      .get(`https://bramhan-vidya-api.vercel.app/topics/topic/${id}`)
      .then((response) => {
        setTopic(response.data);
      })
      .catch((error) => {
        toast.error(error.message);
      });
  }, [id]);

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!topic.name) {
      toast.error("Name field cannot be blank!");
    } else {
      const filteredTopic = {
        ...topic,
        userId: GetUserId(),
        randomKeyDetails: topic.randomKeyDetails.filter(
          (detail) => detail.key && detail.value
        ),
        lists: topic.lists
          .filter((list) => list.listName)
          .map((list) => ({
            ...list,
            items: list.items.filter((item) => item),
          })),
      };

      axios
        .put(
          `https://bramhan-vidya-api.vercel.app/topics/topic/${id}`,
          filteredTopic
        )
        .then((response) => {
          toast.success("Data updated successfully!");
          navigate(`/topic/${id}`);
        })
        .catch((error) => {
          toast.error(error.message || "Error occured!");
        });
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setTopic((prevTopic) => ({
      ...prevTopic,
      [name]: value,
    }));
  };

  const handleRandomKeyDetailsChange = (event, index) => {
    const { name, value } = event.target;
    setTopic((prevTopic) => ({
      ...prevTopic,
      randomKeyDetails: prevTopic.randomKeyDetails.map((detail, i) =>
        i === index ? { ...detail, [name]: value } : detail
      ),
    }));
  };

  const handleListsChange = (event, index) => {
    const { name, value } = event.target;
    setTopic((prevTopic) => ({
      ...prevTopic,
      lists: prevTopic.lists.map((list, i) =>
        i === index ? { ...list, [name]: value } : list
      ),
    }));
  };

  const handleListItemsChange = (event, listIndex, itemIndex) => {
    const { value } = event.target;
    setTopic((prevTopic) => ({
      ...prevTopic,
      lists: prevTopic.lists.map((list, i) =>
        i === listIndex
          ? {
              ...list,
              items: list.items.map((item, j) =>
                j === itemIndex ? value : item
              ),
            }
          : list
      ),
    }));
  };

  const addRandomKeyDetail = () => {
    setTopic((prevTopic) => ({
      ...prevTopic,
      randomKeyDetails: [...prevTopic.randomKeyDetails, { key: "", value: "" }],
    }));
  };

  const addList = () => {
    setTopic((prevTopic) => ({
      ...prevTopic,
      lists: [...prevTopic.lists, { listName: "", items: [""] }],
    }));
  };

  const addListItem = (listIndex) => {
    setTopic((prevTopic) => ({
      ...prevTopic,
      lists: prevTopic.lists.map((list, i) =>
        i === listIndex ? { ...list, items: [...list.items, ""] } : list
      ),
    }));
  };

  return (
    <div className="add-topic-container">
      <h1>Update Topic</h1>
      <form onSubmit={handleSubmit}>
        <label>Name: </label>
        <input
          type="text"
          name="name"
          value={topic.name}
          onChange={handleInputChange}
        />
        <label>Description: </label>
        <textarea
          name="description"
          value={topic.description}
          onChange={handleInputChange}
        />{" "}
        <div className="add-topic-container">
          <h2>Random Key Details:</h2>
          {topic.randomKeyDetails.map((detail, index) => (
            <div key={index}>
              <label>Key: </label>

              <input
                placeholder={`KEY: ${index + 1}`}
                type="text"
                name="key"
                value={detail.key}
                onChange={(event) => handleRandomKeyDetailsChange(event, index)}
              />
              <label>Value: </label>
              <input
                placeholder={`VALUE: ${index + 1}`}
                type="text"
                name="value"
                value={detail.value}
                onChange={(event) => handleRandomKeyDetailsChange(event, index)}
              />
            </div>
          ))}
          <button type="button" onClick={addRandomKeyDetail}>
            Do you have more Key Detail?
          </button>
        </div>
        {topic.lists.map((list, listIndex) => (
          <div key={listIndex}>
            <h2>List: {listIndex + 1}</h2>
            <div className="add-topic-container">
              <label>List Name: </label>
              <input
                placeholder={`List: ${listIndex + 1}`}
                type="text"
                name="listName"
                value={list.listName}
                onChange={(event) => handleListsChange(event, listIndex)}
              />

              <label>Items: </label>
              {list.items.map((item, itemIndex) => (
                <input
                  type="text"
                  key={itemIndex}
                  placeholder={`Item: ${itemIndex + 1}`}
                  value={item}
                  onChange={(event) =>
                    handleListItemsChange(event, listIndex, itemIndex)
                  }
                />
              ))}
              <button type="button" onClick={() => addListItem(listIndex)}>
                Add More Item in this list!
              </button>
            </div>
          </div>
        ))}
        <button type="button" onClick={addList}>
          Add a new blank List
        </button>{" "}
        <br />
        <button type="submit">Submit your final Topic</button>
      </form>
    </div>
  );
}
