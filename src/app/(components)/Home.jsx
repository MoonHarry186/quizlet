"use client";
import React, { useContext, useEffect, useState } from "react";
import Cookies from "js-cookie";
import { GlobalContext } from "../(context)/GlobalState";
import Course from "./Course";
import Link from "next/link";

const Home = () => {
  const { isLogin } = useContext(GlobalContext);
  const [coursesList, setCoursesList] = useState([]);
  const [startIndex, setStartIndex] = useState(0);
  
  useEffect(() => {
      fetch(`http://localhost:3000/api/Courses/${Cookies.get("userId")}`)
        .then((res) => {
          if (!res.ok) {
            throw new Error("Network response was not ok");
          }
          return res.json();
        })
        .then((data) => {
          setCoursesList(data.courses);
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
  }, []);

  const handleNext = () => {
    setStartIndex((prevIndex) => prevIndex + 3);
  };

  const handlePrevious = () => {
    setStartIndex((prevIndex) => prevIndex - 3);
  };

  return (
    <div className="container mx-auto">
      <div className="flex space-x-4">
        {coursesList.length > 0 &&
          coursesList.slice(startIndex, startIndex + 3).map((course) => (
            <Link
              className="w-full"
              key={course._id}
              href={`/course/${course._id}`}
            >
              <Course
                courseName={course.name}
                cards={course.cards}
                description={course.description}
                courseAuthor={course.author}
              />
            </Link>
          ))}
      </div>
      {coursesList.length > 3 && (
        <div className="flex justify-center mt-4 space-x-4">
          <button
            onClick={handlePrevious}
            disabled={startIndex === 0}
            className={`px-4 py-2 rounded ${
              startIndex === 0
                ? "bg-gray-300 text-gray-700 cursor-not-allowed"
                : "bg-gray-500 text-white hover:bg-gray-600"
            }`}
          >
            Previous
          </button>
          <button
            onClick={handleNext}
            disabled={startIndex + 3 >= coursesList.length}
            className={`px-4 py-2 rounded ${
              startIndex + 3 >= coursesList.length
                ? "bg-blue-300 text-gray-700 cursor-not-allowed"
                : "bg-blue-500 text-white hover:bg-blue-600"
            }`}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default Home;
