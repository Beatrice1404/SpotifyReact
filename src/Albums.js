import * as React from 'react';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';

import { useState,useEffect } from 'react';


export default function Albums({handleSongClick}) {

     const [songs,setSongs]=useState([]);
     useEffect(()=>{fetch("https://64be53f45ee688b6250c340c.mockapi.io/songs").then(response=>response.json()).then(setSongs);},[])
     
  return (
    <ImageList sx={{ width: "85vw" , marginLeft:10, color: "custom.white" }} cols={4}>
      {
        songs.map((item) => (
        <ImageListItem key={item.img} sx={{margin:"0 20px" , width:300}}  onClick={() => handleSongClick(item)}>
          <img
            src={`${item.img}?w=248&fit=crop&auto=format`}
            srcSet={`${item.img}?w=248&fit=crop&auto=format&dpr=2 2x`}
            alt={item.title}
            loading="lazy"
          />
          <ImageListItemBar
            title={item.title}
            subtitle={<span>by: {item.author}</span>}
            position="below"
          />
        </ImageListItem>
      ))}
    </ImageList>
  );
}