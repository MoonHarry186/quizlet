"use client";
import React, { useContext, useEffect, useState } from "react";
import { GlobalContext } from "../(context)/GlobalState";
import Course from "./Course";
import Link from "next/link";
import Skeleton from "./Skeleton";
import Login from "./Login";
const Home = ({data}) => {
  const { isLogin } = useContext(GlobalContext);
  const [startIndex, setStartIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  const handleNext = () => {
    setStartIndex((prevIndex) => prevIndex + 3);
  };

  const handlePrevious = () => {
    setStartIndex((prevIndex) => prevIndex - 3);
  };

  useEffect(() => {
    setLoading(false)
  }, [data])

  return (
    <div className="container mx-auto">
      <div className="flex space-x-4">
        {loading ? (
          // Display 3 skeletons while loading
          Array.from({ length: 3 }).map((_, index) => (
            <div key={index} className="w-full">
               <Skeleton/>
            </div>
          ))
        ) : data.length > 0 ? (
          data.slice(startIndex, startIndex + 3).map((course) => (
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
          ))
        ) : (
          "No courses available"
        )}
      </div>
      {data.length > 3 && (
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
            disabled={startIndex + 3 >= data.length}
            className={`px-4 py-2 rounded ${
              startIndex + 3 >= data.length
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
