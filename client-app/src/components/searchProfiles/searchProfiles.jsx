import React from 'react'
import { useState } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { findByUsername } from '../../../redux/actions/index';

const searchProfiles = () => {

    const user = useSelector((state) => state.user)

    const [input, setInput] = useState({
        username: "",
        authorization: ""
    });
    const dispatch = useDispatch()
    const handleChange = (e) => {
        e.preventDefault();
        setInput({
            username: e.target.value,
            authorization: "Bearer " + user.token
        })
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(input)
        dispatch(findByUsername(input))
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