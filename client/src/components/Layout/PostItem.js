import React, { useState } from 'react';
import { Paper, Typography, Avatar, Button } from '@mui/material';
import CommentsForm from './CommentsForm';

const PostItem = ({ post }) => {
  const [likes, setLikes] = useState(post.likes.length);
  const [comments, setComments] = useState(post.comments);
  const [isLiked, setIsLiked] = useState(false);
  const [commentsFormOpen, setCommentsFormOpen] = useState(false);

  const handleLike = () => {
    if (isLiked) {
      setLikes(likes - 1);
    } else {
      setLikes(likes + 1);
    }
    setIsLiked(!isLiked);
  };

  const addComment = (commentText) => {
    setComments([...comments, commentText]);
  };

  return (
    <Paper style={{ padding: '20px', marginBottom: '20px' }}>
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
        <Avatar alt="User" src="/path/to/user-pic.jpg" />
        <Typography variant="h6" style={{ marginLeft: '10px' }}>User Name</Typography>
      </div>
      <Typography variant="body1">{post.text}</Typography>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '10px' }}>
        <Button onClick={handleLike}>
          {isLiked ? 'Unlike' : 'Like'} ({likes})
        </Button>
        <Button onClick={() => setCommentsFormOpen(true)}>Comments ({comments.length})</Button>
      </div>
      <CommentsForm
        open={commentsFormOpen}
        onClose={() => setCommentsFormOpen(false)}
        comments={comments}
        addComment={addComment}
      />
    </Paper>
  );
};

export default PostItem;
