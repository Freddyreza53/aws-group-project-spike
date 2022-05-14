import React, { useRef} from 'react';
import LogOutButton from '../LogOutButton/LogOutButton';
import {useSelector} from 'react-redux';
import {useState} from 'react'
import 'react-dropzone-uploader/dist/styles.css'
import Dropzone from 'react-dropzone-uploader'
import { useDispatch } from 'react-redux';
import ReactPlayer from 'react-player'


function UserPage() {
  const vidRef = useRef(null);
  const handlePlayVideo = () => {
    vidRef.current.play();
  }
  
  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const image = useSelector(store => store.image)

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

      // post the image directly to the s3 bucket
      await fetch(url, {
        method: "PUT",
        headers: {
          "Content-Type": "image/jpeg"
        },
        body: fileToUpload['file']
      })

      imageUrl = url.split('?')[0]
      console.log(imageUrl)

      dispatch({
        type: 'SET_IMAGE',
        payload: imageUrl
      })


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
        maxFiles={1}
        inputContent={(files, extra) => (extra.reject ? 'Image, audio and video files only' : 'Click Here or Drag 1 Picture/Video')}
        styles={{
          dropzoneReject: { borderColor: 'red', backgroundColor: '#DAA' },
          inputLabel: (files, extra) => (extra.reject ? { color: 'red' } : {}),
          dropzone: { width: 400, minHeight: 300, maxHeight: 350 },
          dropzoneActive: { borderColor: "green" }
        }}
        accept="image/*,audio/*,video/*"
      />
      <img src={image}/>
      <ReactPlayer 
        url={image}
        width='400px'
        height='600px'
        controls = {true}/>
      {/* <video ref={vidRef}>
        <source src={image} type="video/mp4" />
      </video> */}
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
