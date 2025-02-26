import React, { useContext, useState } from 'react';
import { Box, IconButton, InputBase, Paper, Popover, Typography } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import SearchContext from '../Context/SearchContext';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';

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
                    <Typography>Please refresh the page and try again if the data doesn't appear.</Typography>
                </Box>
            </Popover>
        </div>
    );
};

const Search = () => {
    const { setSearchValue } = useContext(SearchContext);
    const [inputValue, setInputValue] = useState('');

    const handleInputChange = (event) => {
        setInputValue(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        setSearchValue(inputValue);
        setInputValue('');
    };

    return (
        <Box
            display='flex'
            alignItems='center'
            justifyContent='center'
            paddingY='20px'
            width='100%'
        >
            <Paper
                component="form"
                sx={{
                    p: '5px 15px',
                    display: 'flex',
                    alignItems: 'center',
                    width: '100%',
                    maxWidth: { xs: '90%', sm: '500px' },
                    margin: '0 auto',
                    position: 'relative',
                    borderRadius: '30px',
                    boxShadow: 3,
                    backgroundColor: '#f5f5f5',
                }}
                onSubmit={handleSubmit}
            >
                <IconButton type="button" sx={{ p: '10px', color: '#555' }} aria-label="info">
                    <AlertMessage />
                </IconButton>
                <InputBase
                    sx={{ ml: 1, flex: 1, fontSize: '16px' }}
                    placeholder="Search User"
                    inputProps={{ 'aria-label': 'search user' }}
                    value={inputValue}
                    onChange={handleInputChange}
                />
                <IconButton type="submit" sx={{ p: '10px', color: '#007bff' }} aria-label="search">
                    <SearchIcon fontSize='large' />
                </IconButton>
            </Paper>
        </Box>
    );
};

export default Search;