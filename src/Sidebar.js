import * as React from 'react';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import { useNavigate } from 'react-router-dom'; 

export default function BasicList() {
  const navigate = useNavigate();
  const [categories, setCategories] = React.useState([]);

  React.useEffect(() => {
    fetch("https://64be53f45ee688b6250c340c.mockapi.io/categories")
      .then(response => response.json())
      .then(data => setCategories(data))
      .catch(error => console.error("Error fetching categories:", error));
  }, []);

  return (
    <Box sx={{ width: '80%',  bgcolor: 'custom.black', marginTop: `10px`, display: 'flex', flexDirection: 'column', alignItems: 'center' , height:"200vh"}}>
      <h2 style={{ color: 'white', marginBottom: '10px' }}>Genres</h2>
      <nav>
        <List>
          {categories.map((cat) => (
            <ListItemButton
              key={cat.value}
              onClick={() => navigate(`/Genres/${cat.value}`)}
              sx={{ fontSize: "18px", color: "custom.white", fontWeight: "600", margin: "10px" }} 
            >
              {cat.label}
            </ListItemButton>
          ))}
        </List>
      </nav>
    </Box>
  );
}