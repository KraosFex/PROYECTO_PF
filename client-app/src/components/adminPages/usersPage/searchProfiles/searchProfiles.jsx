import React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { findUserByName } from "../../../../../redux/actions/index";
import style from "./search.module.css";

const SearchProfiles = () => {
  const token = useSelector((state) => state.reducerCompleto.authToken);
  const [input, setInput] = useState("");
  const dispatch = useDispatch();
  const handleChange = (e) => {
    e.preventDefault();
    setInput(e.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(findUserByName({ input, token }));
    setInput("");
  };

  return (
    <div className={style.search}>
      <form>
        <input placeholder="Buscar usuario" onChange={(e) => handleChange(e)} />
        <button
          onClick={(e) => {
            handleSubmit(e);
          }}
        >
          🔎
        </button>
      </form>
    </div>
  );
};

export default SearchProfiles;
