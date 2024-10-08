"use client";
import React, { useEffect, useState } from "react";
import Card from "./Card";
// import { useParams } from "react-router-dom";
const Course = () => {
  const [cardsList, setCardsList] = useState([]);
//   const {id} = useParams()
  const [currentCardIndex, setCurrentCardIndex] = useState(0); // Track the current card index

  const nextCard = () => {
    if (currentCardIndex < cardsList.length - 1) {
      setCurrentCardIndex((prevIndex) => prevIndex + 1);
    }
  };

  const prevCard = () => {
    if (currentCardIndex > 0) {
      setCurrentCardIndex((prevIndex) => prevIndex - 1);
    }
  };
//   useEffect(() => {
//     fetch(`http://localhost:3000/api/Courses`)
//       .then(res => {
//         if (!res.ok) {
//           throw new Error('Network response was not ok');
//         }
//         return res.json(); // Return the promise from res.json()
//       })
//       .then(data => {
//         console.log(data); // Log the fetched data
//       })
//       .catch(error => {
//         console.error("Error fetching data:", error);
//       });
//   }, []);
  const progress = (currentCardIndex + 1) / cardsList.length * 100;
  return (
    <>
      Course
    </>
  );
};

export default Course;
