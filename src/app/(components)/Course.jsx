"use client";
import React, { useEffect, useState } from "react";
import Skeleton from "./Skeleton";
const Course = ({ courseName, cards, description, courseAuthor }) => {
  return (
    <div className="flex flex-col gap-1 p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
      <h5 className="text-xl font-bold tracking-tight text-gray-900 dark:text-white">
        {courseName}
      </h5>
      <span className="bg-blue-100 w-fit text-blue-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded-full dark:bg-blue-900 dark:text-blue-300">
        {cards.length} {cards.length > 1 ? `Terms` : `Term`}
      </span>
      <p className="font-normal text-gray-700 dark:text-gray-400">{description}</p>
      <div className="author flex gap-2 items-center">
        <img
          className="rounded-full w-6 h-6"
          src={courseAuthor.avatar}
          alt="User Avatar"
        />
        <p>{courseAuthor.name}</p>
      </div>
    </div>
  );
};

export default Course;
