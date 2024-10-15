"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Card from "@/app/(components)/Card";
const CourseDetail = () => {
  const { id } = useParams();

  const [cards, setCards] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:3000/api/Courses/${id}`)
      .then((res) => res.json())
      .then((res) => {
        setCards(res.courses[0].cards);
      });
  }, []);
  return (
    <div>
      {cards.length > 0 &&
        cards.map((card) => (
          <Card
            key={card._id}
            id={card._id}
            term={card.term}
            type={card.type}
            definition={card.definition}
            image={card.image}
            example={card.example}
          />
        ))}
    </div>
  );
};

export default CourseDetail;
