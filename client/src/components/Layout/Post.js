import React, { useState } from 'react';
import { Paper, Typography, Avatar, Button, TextField } from '@mui/material';

function Post({ post }) {
  const [likes, setLikes] = useState(post.likes);
  const [comments, setComments] = useState(post.comments);
  const [commentText, setCommentText] = useState('');
  const [showComments, setShowComments] = useState(false);

  const handleLike = () => {
    setLikes(likes + 1);
  };

  const handleComment = () => {
    if (commentText.trim() !== '') {
      setComments([...comments, commentText]);
      setCommentText('');
    }
  };

  return (
    <Paper style={{ padding: '20px', marginBottom: '20px' }}>
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
        <Avatar alt="User" src="/path/to/user-pic.jpg" />
        <Typography variant="h6" style={{ marginLeft: '10px' }}>User Name</Typography>
      </div>
      <Typography variant="body1">{post.text}</Typography>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '10px' }}>
        <Button onClick={handleLike}>Like ({likes})</Button>
        <Button onClick={() => setShowComments(!showComments)}>Comments ({comments.length})</Button>
      </div>
      {showComments && (
        <div style={{ marginTop: '10px' }}>
          {comments.map((comment, index) => (
            <Typography key={index} variant="body2" style={{ marginBottom: '5px' }}>
              {comment}
            </Typography>
          ))}
          <TextField
            variant="outlined"
            fullWidth
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            placeholder="Add a comment"
            style={{ marginTop: '10px' }}
          />
          <Button variant="contained" color="primary" onClick={handleComment} style={{ marginTop: '10px' }}>
            Comment
          </Button>
        </div>
      )}
    </Paper>
  );
}

export default Post;
