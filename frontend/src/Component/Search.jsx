import React, { useContext, useState } from 'react';
import {
  Box,
  IconButton,
  InputBase,
  Paper,
  Popover,
  Typography,
  useTheme,
  useMediaQuery
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import SearchContext from '../Context/SearchContext';

const AlertMessage = () => {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'info-popover' : undefined;

  return (
    <div>
      <IconButton onClick={handleClick} aria-describedby={id}>
        <InfoOutlinedIcon color='info' />
      </IconButton>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
      >
        <Box sx={{ p: 2 }}>
          <Typography variant="body2">
            Please refresh the page and try again if the data doesn't appear.
          </Typography>
        </Box>
      </Popover>
    </div>
  );
};

const Search = () => {
  const { setSearchValue } = useContext(SearchContext);
  const [inputValue, setInputValue] = useState('');
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (inputValue.trim()) {
      setSearchValue(inputValue.trim());
      setInputValue('');
    }
  };

  return (
    <Box
      sx={{
        px: 2,
        py: 4,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <Typography
        variant={isMobile ? 'h5' : 'h4'}
        component="h1"
        gutterBottom
        sx={{ fontWeight: 'bold', color: '#3b82f6' }}
      >
        Search for a User
      </Typography>

      <form onSubmit={handleSubmit} style={{ width: '100%', maxWidth: 500 }}>
        <Paper
          elevation={4}
          sx={{
            p: '6px 10px',
            display: 'flex',
            alignItems: 'center',
            borderRadius: '1rem',
            background: 'white',
            boxShadow: '0 8px 20px rgba(0,0,0,0.1)',
          }}
        >
          <InputBase
            sx={{ ml: 2, flex: 1 }}
            placeholder="Enter Codeforces handle..."
            inputProps={{ 'aria-label': 'search codeforces user' }}
            value={inputValue}
            onChange={handleInputChange}
          />
          <IconButton type="submit" sx={{ p: '10px' }} aria-label="search">
            <SearchIcon color="primary" />
          </IconButton>
          <AlertMessage />
        </Paper>
      </form>
    </Box>
  );
};

export default Search;
