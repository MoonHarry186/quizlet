"use client";
import React, { useContext, useEffect, useState } from 'react'
import Cookies from 'js-cookie';
import { GlobalContext } from '../(context)/GlobalState';
import Login from './Login'
import Course from './Course';
import Link from 'next/link';
const Home = () => {
  const {isLogin} = useContext(GlobalContext)
  const [coursesList, setCoursesList] = useState([])
  useEffect(() => {
    fetch(`http://localhost:3000/api/Courses`)
      .then(res => {
        if (!res.ok) {
          throw new Error('Network response was not ok');
        }
        return res.json(); // Return the promise from res.json()
      })
      .then(data => {
        setCoursesList(data.courses); // Log the fetched data
      })
      .catch(error => {
        console.error("Error fetching data:", error);
      });
  }, []);
  console.log('coursesList', coursesList.courses);
  
  return (
    <div className="containter mx-auto">
        {coursesList.length > 0 && coursesList.map((course) => (
          <Link key={course._id} href={`/course/${course._id}`} >{course.name} </Link>
        ))}
      </div>
  )
}

export default Home
