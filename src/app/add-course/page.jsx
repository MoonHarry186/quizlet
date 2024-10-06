"use client";

import { useState } from "react";
import CardInput from "../(components)/CardInput";

const AddCourse = () => {
  const [cardsInput, setCardsInput] = useState([0, 1, 2]); // Start with one card
  const [courseInfo, setCourseInfo] = useState({
    name: "",
    description: "",
    cards: [],
    author: "",
    dateCreated: "",
  });

  const uploadImage = () => {};

  const saveCourse = async () => {
    try {
      // First, save each card and get their IDs
      const cardIds = await Promise.all(
        courseInfo.cards.map(async (card) => {
          const response = await fetch("http://localhost:3000/api/Cards", {
            // Replace with actual cards endpoint
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              formData: {
                term: "love",
                type: "verb",
                definition: "To express your feeling for other haha",
                image: "https://image.example.com",
                example: "Example",
              },
            }),
          });

          const result = await response.json();
          if (!response.ok) {
            throw new Error(result.message || "Failed to create card");
          }

          return result.card._id; // Adjust this based on the response structure
        })
      );

      // Next, save the course with card IDs
      const courseData = {
        ...courseInfo,
        cards: cardIds, // Assign the card IDs to the course's cards field
      };

      // const courseResponse = await fetch('/api/Courses', { // Replace with actual courses endpoint
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ formData: courseData })
      // });

      // const courseResult = await courseResponse.json();
      // if (!courseResponse.ok) {
      //   throw new Error(courseResult.message || 'Failed to create course');
      // }

      // console.log('Course Created:', courseResult.course);
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
  const handleCardChange = (index) => (field) => (e) => {
    const updatedCards = [...courseInfo.cards];
    const value = e.target.value;

    // Ensure the cards array has an object for this index
    if (!updatedCards[index]) {
      updatedCards[index] = {};
    }

    updatedCards[index][field] = value;
    setCourseInfo({ ...courseInfo, cards: updatedCards });
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
              handleUploadImage={uploadImage}
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
