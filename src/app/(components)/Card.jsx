import React, { useEffect, useRef, useState } from "react";
import { HiOutlineSpeakerWave } from "react-icons/hi2";
import { FaRegLightbulb } from "react-icons/fa";
import { FaPencil } from "react-icons/fa6";
import { FaRegStar } from "react-icons/fa";
import EditCard from "./EditCard";

const Card = ({ id, term, type, definition, image, example }) => {
  const [isFront, setIsFront] = useState(true);
  const [showHint, setShowHint] = useState(false);
  const [isEdit, setIsEdit] = useState(false);

  const inner = useRef();
  const handleFlip = () => {
    setIsFront(!isFront);
    inner.current.style.transform = isFront ? "rotateX(180deg)" : "";
  };

  const readOutLoud = (e) => {
    e.stopPropagation(); // Prevent click event from propagating to the parent div

    const speech = new SpeechSynthesisUtterance();
    speech.text = isFront ? term : definition;
    speech.lang = "en-US"; // You can change this to any other language code
    speech.volume = 1; // Volume from 0 to 1
    speech.rate = 1; // Speed of speech from 0.1 to 10
    speech.pitch = 1; // Pitch of speech from 0 to 2
    const availableVoices = window.speechSynthesis.getVoices();
    speech.voice = availableVoices[3];

    window.speechSynthesis.speak(speech);
  };

  const handleShowHint = (e) => {
    e.stopPropagation();
    setShowHint(!showHint);
  };

  const handleEdit = (e) => {
    e.stopPropagation();
    setIsEdit(!isEdit);
  };

  return (
    <div style={{ perspective: "1000px" }}>
      <div
        ref={inner}
        onClick={handleFlip}
        style={{ transformStyle: "preserve-3d" }}
        className="hover:cursor-pointer text-center relative p-20 transition-transform duration-1000 text-white font-bold"
      >
        <div className="rounded-md drop-shadow-lg backface-hidden absolute top-0 bottom-0 right-0 left-0 p-8 bg-slate-800 flex items-center justify-center">
          <h2>{term}</h2>
          <p>{type}</p>
          <button
            className={`absolute top-4 right-20 p-2 hover:bg-slate-100 hover:rounded-full`}
          >
            <FaRegStar />
          </button>
          <button
            className={`absolute top-4 right-12 p-2 hover:bg-slate-100 hover:rounded-full`}
            onClick={(e) => handleEdit(e)}
          >
            <FaPencil />
          </button>
          <button
            className={`absolute top-4 right-4 p-2 hover:bg-slate-100 hover:rounded-full`}
            onClick={(e) => readOutLoud(e)}
          >
            <HiOutlineSpeakerWave />
          </button>
          <button
            className={`absolute top-4 left-4 flex gap-2 items-center`}
            onClick={(e) => handleShowHint(e)}
          >
            <FaRegLightbulb className="" />
            {showHint ? (
              <span>
                {definition.slice(0, Math.floor(definition.length * 0.3))}____
              </span>
            ) : (
              <span>Show hint</span>
            )}
          </button>
        </div>
        <div className="rounded-md drop-shadow-lg backface-hidden absolute top-0 bottom-0 right-0 left-0 p-8 bg-slate-800 flex items-center justify-center rotate-x-180">
          <p>Definition: {definition}</p>
          {example && <p>Example: {example}</p>}
          {image && (
            <img
              src={image}
              alt={term}
              className="w-80 h-40 object-contain my-6"
            />
          )}
          <button
            className={`absolute top-4 right-20 p-2 hover:bg-slate-600 hover:rounded-full`}
          >
            <FaRegStar />
          </button>
          <button
            className={`absolute top-4 right-12 p-2 hover:bg-slate-600 hover:rounded-full`}
            onClick={(e) => handleEdit(e)}
          >
            <FaPencil />
          </button>
          <button
            className={`absolute top-4 right-4 absolute top-4 right-4 p-2 hover:bg-slate-600 hover:rounded-full`}
            onClick={(e) => readOutLoud(e)}
          >
            <HiOutlineSpeakerWave />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Card;
