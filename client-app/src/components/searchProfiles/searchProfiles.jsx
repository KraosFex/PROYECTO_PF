import React from 'react'
import { useState } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { findUserByName } from '../../../redux/actions/index';

const searchProfiles = () => {

    const [input, setInput] = useState("");
    const dispatch = useDispatch()
    const handleChange = (e) => {
        e.preventDefault();
        setInput(e.target.value)
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(findUserByName(input))
        setInput("");
    }
    
  return (
    <div>
        <form>
            <input placeholder='search...' onChange={(e) => handleChange(e)}/>
            <button onClick={(e) => {handleSubmit(e)}}>🔎</button>
        </form>
    </div>
  )
}

export default searchProfiles
