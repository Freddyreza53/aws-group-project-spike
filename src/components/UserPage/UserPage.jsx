import React from 'react';
import LogOutButton from '../LogOutButton/LogOutButton';
import {useSelector} from 'react-redux';
import {useState} from 'react'

function UserPage() {
  // this component doesn't do much to start, just renders some user reducer info to the DOM
  const user = useSelector((store) => store.user);
  
    // const imageForm = document.querySelector("#imageForm");
    // const imageInput = document.querySelector("#imageInput");
    const [imageInput, setImageInput] = useState('');
    const uploadImage = async (event) => {
      event.preventDefault();
      // const file = imageInput.files[0];
      const { url } = await fetch("/s3Url").then(res => res.json())
      console.log(url);
    
    }
  
  

  return (
    <div className="container">
      <h2>Welcome, {user.username}!</h2>
      <p>Your ID is: {user.id}</p>
      <form onSubmit={uploadImage}>
        <input id="imageInput" value={imageInput} onChange={(event) => setImageInput(event.target.value)} type="file" accept="image/*"/>
        <button type="submit">Upload</button>
      </form>

      <LogOutButton className="btn" />
    </div>
  );
}

// this allows us to use <App /> in index.js
export default UserPage;
