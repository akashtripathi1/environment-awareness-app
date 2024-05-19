import React, { useState } from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, TextField, Button } from '@mui/material';
import CommentItem from './CommentItem';

const CommentsForm = ({ open, onClose, comments, addComment }) => {
  const [commentText, setCommentText] = useState('');

  const handleSubmit = () => {
    if (commentText.trim() !== '') {
      addComment(commentText);
      setCommentText('');
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Comments</DialogTitle>
      <DialogContent>
        {comments.map((comment, index) => (
          <CommentItem key={index} comment={comment} />
        ))}
        <TextField
          variant="outlined"
          fullWidth
          value={commentText}
          onChange={(e) => setCommentText(e.target.value)}
          placeholder="Add a comment"
          style={{ marginTop: '10px' }}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleSubmit} color="primary" variant="contained">
          Submit
        </Button>
        <Button onClick={onClose} color="secondary">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CommentsForm;
