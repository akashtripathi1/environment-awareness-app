import React from 'react';
import { Typography } from '@mui/material';

const CommentItem = ({ comment }) => {
  return (
    <Typography variant="body2" style={{ marginBottom: '5px' }}>
      {comment}
    </Typography>
  );
};

export default CommentItem;
