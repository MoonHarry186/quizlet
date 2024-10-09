"use client";
import React, { useEffect, useState } from "react";
const Course = ({ courseName, cards, description, courseAuthor }) => {
  const [user, setUser] = useState({});
  useEffect(() => {
    fetch(`http://localhost:3000/api/Users/${courseAuthor}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error("Network response was not ok");
        }
        return res.json();
      })
      .then((data) => {
        setUser(data.user);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);
  return (
    <div class="block p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
      <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
        {courseName}
      </h5>
      <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
        {cards.length}
      </h5>
      <p class="font-normal text-gray-700 dark:text-gray-400">{description}</p>
      <p>{user.name}</p>
      <img src={user.avatar} alt="User Avatar" />
    </div>
  );
};

export default Course;
