import React from 'react';
import LogOutButton from '../LogOutButton/LogOutButton';
import {useSelector} from 'react-redux';
import {useState} from 'react'
import 'react-dropzone-uploader/dist/styles.css'
import Dropzone from 'react-dropzone-uploader'

function UserPage() {
  // this component doesn't do much to start, just renders some user reducer info to the DOM
  const user = useSelector((store) => store.user);

  let imageUrl = ''

  
    // specify upload params and url for your files
    const getUploadParams = ({ meta }) => { return { url: 'https://httpbin.org/post' } }
    
    // called every time a file's `status` changes
    const handleChangeStatus = ({ meta, file }, status) => { console.log(status, meta, file) }
    
    // receives array of files that are done uploading when submit button is clicked
    const handleSubmit = async (files, allFiles) => {
      console.log(files[0])
      const fileToUpload = files[0];
      console.log(fileToUpload['file']);
      

      // get secure url from our server
      const { url } = await fetch("/s3Url").then(res => res.json())
      console.log(url)

      // post the image direclty to the s3 bucket
      await fetch(url, {
        method: "PUT",
        headers: {
          "Content-Type": "image/jpeg"
        },
        body: fileToUpload['file']
      })

      imageUrl = url.split('?')[0]
      console.log(imageUrl)

        // const img = document.createElement("img")
        // img.src = imageUrl
        // document.body.appendChild(img)

      console.log(files.map(f => f.meta))
      allFiles.forEach(f => f.remove())
    
    
    }
  
    // const imageForm = document.querySelector("#imageForm");
    // const imageInput = document.querySelector("#imageInput");

    // const uploadImage = async (event) => {
    //   event.preventDefault()
    //   const file = imageInput.files[0]
    
    //   // get secure url from our server
    //   const { url } = await fetch("/s3Url").then(res => res.json())
    //   console.log(url)
    
    //   // post the image direclty to the s3 bucket
    //   await fetch(url, {
    //     method: "PUT",
    //     headers: {
    //       "Content-Type": "multipart/form-data"
    //     },
    //     body: file
    //   })
    
    //   const imageUrl = url.split('?')[0]
    //   console.log(imageUrl)
    
    //   // post requst to my server to store any extra data
      
      
    //   // const img = document.createElement("img")
    //   // img.src = imageUrl
    //   // document.body.appendChild(img)
    // }

    // const [imageInput, setImageInput] = useState('');
    // const uploadImage = async (event) => {
    //   event.preventDefault();
    //   console.log(imageInput);

    //   const file = imageInput;
    //   const { url } = await fetch("/s3Url").then(res => res.json())
    //   console.log(url);

      // fetch({
      //   method: "PUT",
      //   headers: {
      //     "Content-Type": "multipart/form-data"
      //   },
      //   body: file
      // })

      // const imageUrl= url.split('?')[0];
      // console.log(imageUrl);
    // }
  
    
  

  return (
    <div className="container">
      <h2>Welcome, {user.username}!</h2>
      <p>Your ID is: {user.id}</p>
      {/* <form onSubmit={uploadImage}>
        <input id="imageInput" value={imageInput} onChange={(event) => setImageInput(event.target.value)} type="file" accept="image/*"/>
        <button type="submit">Upload</button>
      </form> */}
      <Dropzone
        getUploadParams={getUploadParams}
        onChangeStatus={handleChangeStatus}
        onSubmit={handleSubmit}
        accept="image/*,audio/*,video/*"
      />
      <img src={imageUrl}/>
      {/* <form id="imageForm" onSubmit={uploadImage}>
        <input id="imageInput" type="file" accept="image/*"/>
        <button type="submit">Upload</button>
      </form> */}

      <LogOutButton className="btn" />
    </div>
  );
}

// this allows us to use <App /> in index.js
export default UserPage;
