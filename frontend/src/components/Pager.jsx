import React from 'react';
import { Pagination, Box } from '@mui/material';

const Pager = ({ page, totalPages, onChange }) => {
  return (
    <Box display="flex" justifyContent="center" mt={2}>
      <Pagination
        count={totalPages}
        page={page}
        onChange={(e, value) => onChange(value)}
        color="primary"
      />
    </Box>
  );
};

export default Pager;