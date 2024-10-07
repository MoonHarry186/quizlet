"use client";

import { useState } from "react";
import { useContext } from "react";
import { GlobalContext } from "../(context)/GlobalState";
import { loggedUser } from "../(utils)/getCookie";
import CardInput from "../(components)/CardInput";
const AddCourse = () => {

console.log(loggedUser);
  

  const [cardsInput, setCardsInput] = useState([0]); // Start with one card
  const [courseInfo, setCourseInfo] = useState({
    name: "",
    description: "",
    cards: [],
    author: "",
    dateCreated: "",
  });
  const [file, setFile] = useState(null)
  const [imageUrl, setImageUrl] = useState(null);

  const uploadImage = async (e) => {
    const file = e.target.files[0];
    
    if (file) {
      const formData = new FormData();
      formData.append("image", file);
      
      try {
        const res = await fetch("/api/Upload", {
          method: "POST",
          body: formData,
        });
        
        const result = await res.json();
        if (res.ok) {
          return result.url;
        } else {
          console.error("Upload error:", result.error);
        }
      } catch (error) {
        console.error("Upload error:", error);
      }
    }
  };

  const saveCourse = async () => {
    try {
      // Prepare card data for all cards at once
      const cardData = courseInfo.cards?.map((card) => ({
        term: card.term,
        type: card.type,
        definition: card.definition,
        image: card.image,
        example: card.example,
      }));

      // Send bulk request to create all cards
      const cardResponse = await fetch("http://localhost:3000/api/Cards", {
        // Adjust endpoint for bulk creation
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ formData: cardData }), // Send all cards in one go
      });

      const cardResult = await cardResponse.json();
      if (!cardResponse.ok) {
        throw new Error(cardResult.message || "Failed to create cards");
      }
      console.log('cardResult', cardResult);
      
      // Extract card IDs from response
      const cardIds = cardResult.card.map((cardItem) => cardItem._id); // Adjust based on response structure

      // Next, save the course with card IDs
      const courseData = {
        ...courseInfo,
        cards: cardIds, // Assign the card IDs to the course's cards field
        author: loggedUser
      };
      console.log('courseData', courseData);
      
      const courseResponse = await fetch("/api/Courses", {
        // Replace with actual courses endpoint
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ formData: courseData }),
      });

      const courseResult = await courseResponse.json();
      if (!courseResponse.ok) {
        throw new Error(courseResult.message || "Failed to create course");
      }

      console.log("Course Created:", courseResult.course);
    } catch (error) {
      console.error("Error saving course:", error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    saveCourse();
  };

  const handleAddCardInput = () => {
    setCardsInput([...cardsInput, cardsInput.length]); // Add a new card with unique index
  };

  // Handling course input
  const handleChange = (input) => (e) => {
    e.preventDefault();
    setCourseInfo({ ...courseInfo, [input]: e.target.value });
    console.log(courseInfo);
  };

  // Handling card input
  const handleCardChange = (index) => (field) => async (e) => {
    if (field === "image") {
      var image = await uploadImage(e);
    }

    const updatedCards = [...courseInfo.cards];
    const value = image ? image : e.target.value;

    // Ensure the cards array has an object for this index
    if (!updatedCards[index]) {
      updatedCards[index] = {};
    }

    updatedCards[index][field] = value;
    setCourseInfo({ ...courseInfo, cards: updatedCards });
    console.log(courseInfo);
    
  };

  return (
    <form onSubmit={(e) => handleSubmit(e)} action="">
      <label htmlFor="name">Name</label>
      <input
        type="text"
        name="name"
        value={courseInfo.name}
        placeholder="Enter Course Name"
        onChange={handleChange("name")}
      />
      <label htmlFor="description">Desc</label>
      <input
        type="text"
        name="description"
        value={courseInfo.description}
        placeholder="Enter Course Description"
        onChange={handleChange("description")}
      />

      <div className="cards-input">
        {cardsInput.map((cardInput, index) => {
          return (
            <CardInput
              key={index}
              index={index}
              handleChange={handleCardChange(index)}
            />
          );
        })}
        <span className="" onClick={handleAddCardInput}>
          Add More Card
        </span>
      </div>

      <button type="submit">Create</button>
    </form>
  );
};

export default AddCourse;
