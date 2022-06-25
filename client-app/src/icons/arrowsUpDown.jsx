import React from "react";
import { useSelector } from "react-redux";

function ArrowsUpDown() {
  const direction = useSelector((store) => store.arrowUpDown);

  if (direction === "down") {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth="2"
      >
<<<<<<< HEAD
        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
=======
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M19 9l-7 7-7-7"
        />
>>>>>>> 319a9ea1cbcd70259c535a5159498249d55c8552
      </svg>
    );
  } else if (direction === "up") {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth="2"
      >
<<<<<<< HEAD
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" />
=======
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M5 15l7-7 7 7"
        />
>>>>>>> 319a9ea1cbcd70259c535a5159498249d55c8552
      </svg>
    );
  }
}

export default ArrowsUpDown;
