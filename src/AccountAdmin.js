import React, { useEffect, useState } from "react";
import HeaderAccount from "./HeaderAccount";
import { Box, List, ListItem, ListItemText, Avatar, Button } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';


const AccountAdmin = () => {
  const [songs, setSongs] = useState([]);
  const [showCategoryForm, setShowCategoryForm] = useState(false);
  const [showSongForm, setShowSongForm] = useState(false);
  const [newSong, setNewSong] = useState({
    title: "",
    author: "",
    img: "",
    link:"",
    genre: "",
  });
  const [categories, setCategories] = useState([]);
  const [newCategory, setNewCategory] = useState({});

  useEffect(() => {
    fetch("https://64be53f45ee688b6250c340c.mockapi.io/songs")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setSongs(data);//save the songs 
     })
      .catch((error) => {
        console.error("Error fetching songs from the API:", error);
      });

    fetch("https://64be53f45ee688b6250c340c.mockapi.io/categories")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setCategories(data);//save the categories
      })
      .catch((error) => {
        console.error("Error fetching categories from the API:", error);
      });
  }, []);

  const handleDelete = (songId) => {
    fetch(`https://64be53f45ee688b6250c340c.mockapi.io/songs/${songId}`, {
      method: 'DELETE',
    })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      setSongs((prevSongs) => prevSongs.filter((song) => song.id !== songId));
    })
    .catch((error) => {
      console.error("Error deleting song from the API:", error);
    });
    fetch(`https://64be53f45ee688b6250c340c.mockapi.io/songs/`).then(response=>response.json())
    .then(setSongs);
  };

  const handleAddSong = () => {
    fetch("https://64be53f45ee688b6250c340c.mockapi.io/songs", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newSong),
    })
      .then((response) => response.json())
      .then((data) => {
        setSongs([...songs, data]);
        setNewSong({
          title: "",
          author: "",
          img: "",
          link: "",
          genre: "",
        });
      })
      .catch((error) => {
        console.error("Error adding song to the API:", error);
      });
  };

  const handleAddCategory = (newCategory) => {

    fetch("https://64be53f45ee688b6250c340c.mockapi.io/categories", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newCategory),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("New category added:", data);
      })
      .catch((error) => {
        console.error("Error adding category to the API:", error);
      });
  };

  return (
    <Box>
      <HeaderAccount
        onManageSongsClick={() => {
            setShowSongForm(true);
            setShowCategoryForm(false); 
          }}
        onManageCategoriesClick={() => {
          setShowCategoryForm(true);
          setShowSongForm(false); 
        }}
        onAddCategoryClick={handleAddCategory}
      />
      <Box sx={{ display: "flex" , marginTop:"100px",maxWidth: "100%",height: "auto"}}>
        <List sx={{ marginLeft: "300px", marginTop: "20px" }}>
          {songs.map((song) => (
            <ListItem
              key={song.id}
              sx={{
                color: "custom.white",
                width: "100%",
                maxWidth: 360,
                bgcolor: "custom.black",
                marginBottom: "8px",
                padding: "8px",
                display: "flex",
                alignItems: "center",
              }}
            >
              <Avatar
                alt={song.title}
                src={song.img} 
                sx={{ width: 100, height: 100, marginRight: "16px" }}
              />
              <Box sx={{ flex: 1 ,display: "flex", justifyContent: "space-between", alignItems: "center",maxWidth: "100%", height: "auto"}}>
                <ListItemText
                  primary={song.title}
                  secondary={song.author}
                  primaryTypographyProps={{ align: "center" }}
                  secondaryTypographyProps={{ align: "center" }}
                />
                <DeleteIcon sx={{align:"center",color:"red" }} onClick={() => handleDelete(song.id)} />
              </Box>
            </ListItem>
          ))}
        </List>
        {showSongForm ? (
        <Box sx={{ marginLeft: "350px", marginTop: "150px", display: "flex", flexDirection: "column",maxWidth: "100%",height: "auto"}}>
          <Typography sx={{ marginBottom: "50px" ,textAlign:"center",color:"custom.white",fontSize:"50px"}}>
            Manage Songs
          </Typography>
          <TextField
            required
            id="outlined-required"
            label="Song title"
            value={newSong.title}
            onChange={(e) => setNewSong({ ...newSong, title: e.target.value })}
            sx={{ marginBottom: "20px" }}
          />
          <TextField
            label="Artist"
            value={newSong.author}
            onChange={(e) => setNewSong({ ...newSong, author: e.target.value })}
            sx={{ marginBottom: "20px" }}
          />
          <TextField 
            required
            id="outlined-required"
            label="Album image"
            value={newSong.img}
            onChange={(e) => setNewSong({ ...newSong, img: e.target.value })}
            sx={{ marginBottom: "20px" }}
          />
          <TextField 
            required
            id="outlined-required"
            label="Song Url"
            defaultValue="Song Url"
            value={newSong.link}
            onChange={(e) => setNewSong({ ...newSong, link: e.target.value })}
            sx={{ marginBottom: "20px" }}
          />
          <TextField
          id="outlined-select-category"
          select
          label="Category"
          helperText="Please select your category"
          value={newSong.genre}
          onChange={(e) => setNewSong({ ...newSong, genre: e.target.value })}
          sx={{ marginBottom: "20px" }}
        >
          {categories.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
        <Button variant="contained" color="success" onClick={handleAddSong}>
            Add Song
        </Button>
        </Box>
        ) : null 
      }
      {showCategoryForm ? (
  <Box sx={{ marginLeft: "350px", marginTop: "150px", alignItems: "center", display: "flex", flexDirection: "column", maxWidth: "100%", height: "auto" }}>
    <Typography sx={{ marginBottom: "50px", textAlign: "center", color: "custom.white", fontSize: "50px" }}>
      Manage Categories
    </Typography>
    <TextField
      required
      id="outlined-required"
      label="Required"
      defaultValue="Category"
      onChange={(e) => setNewCategory({...newCategory,label:e.target.value})}
    />
    <Button variant="contained" color="success" sx={{ marginTop: "20px" }} onClick={() => handleAddCategory(newCategory)}>
      Add Category
    </Button>
  </Box>
) : null}

      </Box>
    </Box>
  );
};

export default AccountAdmin;