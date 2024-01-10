import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Header from "./Header";
import Sidebar from "./Sidebar";
import Albums from "./Albums";
import { Avatar, ImageList, ImageListItem, ImageListItemBar, Pagination, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

const Genres = () => {
  const [songs, setSongs] = useState([]);
  const [filter, setFilter] = useState("");
  const [filtered, setFiltered] = useState([]);
  const [currentSong, setCurrentSong] = useState(null); 
  const [currentPage, setCurrentPage] = useState(1);
  const albumsPerPage = 10;

  useEffect(() => {
    fetch("https://64be53f45ee688b6250c340c.mockapi.io/songs")
      .then((response) => response.json())
      .then(setSongs);
  }, []);

  const { id } = useParams();
  useEffect(() => {
    setFiltered(
      songs.filter((song) =>
        song.title.toLowerCase().includes(filter.toLowerCase())
      )
    );
  }, [filter, songs]);

  useEffect(() => {
    if (id) {
      setFiltered(songs.filter((song) => song.genre === id));
    } else {
      setFiltered(songs);
    }
    setCurrentPage(1); 
  }, [id, songs]);

  const handleSongClick = (song) => {
    setCurrentSong(song); 
  };

  const handleClose = () => {
    setCurrentSong(null);
    localStorage.removeItem("currentSong");
  };

  const saveCurrentSongToLocalStorage = () => {
    localStorage.setItem("currentSong", JSON.stringify(currentSong));
  };

  const loadCurrentSongFromLocalStorage = () => {
    const savedCurrentSong = localStorage.getItem("currentSong");
    if (savedCurrentSong) {
      setCurrentSong(JSON.parse(savedCurrentSong));
    }
  };

  useEffect(() => {
    loadCurrentSongFromLocalStorage();
  }, []);

  useEffect(() => {
    if (currentSong) {
      saveCurrentSongToLocalStorage();
    }
  }, [currentSong]);


  const indexOfLastAlbum = currentPage * albumsPerPage;
  const indexOfFirstAlbum = indexOfLastAlbum - albumsPerPage;
  const currentAlbums = filtered.slice(indexOfFirstAlbum, indexOfLastAlbum);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handlePageChange = ( page) => {
    setCurrentPage(page);
  };

  return (
    <>
      <Header filter={filter} setFilter={setFilter} />

      <Box display="flex" >
        <Sidebar />
        <Box>
          {id || filter !== "" ? (
            <ImageList
              sx={{ width: "85vw", marginLeft: 10, color: "custom.white" }}
              cols={4}
            >
              {currentAlbums.map((item) => (
                <ImageListItem
                  key={item.img}
                  sx={{ margin: "0 20px", width: 300, cursor: "pointer" }}
                  onClick={() => handleSongClick(item)}
                >
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
          ) : (
            <Albums handleSongClick={handleSongClick}/>
          )}
        </Box>
      </Box>

      {currentSong && (
        <Box
          sx={{
            position: "fixed",
            bottom: 0,
            left: 0,
            width: "100%",
            height: "80px",
            background: "#333",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 1000,
          }}
        >
          <Avatar src={currentSong.img} alt={currentSong.title} sx={{ marginRight: "50px" }} />
          <Box sx={{marginRight:"50px"}}>
            <Typography variant="subtitle1" sx={{ color: "white"}}>
              {currentSong.title}
            </Typography>
            
            <Typography variant="body1" sx={{ color: "white" }}>
              {currentSong.author}
            </Typography>
          </Box>
          <audio controls src={currentSong.link} style={{ width: "80%" }} autoPlay>
            Your browser does not support the audio element.
          </audio>
          <IconButton sx={{color:"custom.black"}} onClick={handleClose}>
            <CloseIcon />
          </IconButton>
        </Box>
      )}

      <Box display="flex" justifyContent="center" mt={2}>
        {filtered.length > albumsPerPage && (
          <Pagination
            count={Math.ceil(filtered.length / albumsPerPage)}
            page={currentPage}
            onChange={handlePageChange}
            color="primary"
          />
        )}
      </Box>
    </>
  );
};

export default Genres;
