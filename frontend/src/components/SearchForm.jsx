import React, { useState } from 'react';
import { TextField, Button, Box } from '@mui/material';

const SearchForm = ({ onSearch }) => {
  const [keyword, setKeyword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (keyword.trim() !== '') onSearch(keyword.trim());
  };

  return (
    <Box component="form" onSubmit={handleSubmit} display="flex" gap={2} mb={3}>
      <TextField
        label="Enter keyword"
        variant="outlined"
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
        fullWidth
      />
      <Button type="submit" variant="contained" color="primary">
        Search
      </Button>
    </Box>
  );
};

export default SearchForm;