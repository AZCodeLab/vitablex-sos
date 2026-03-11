import { createSlice } from '@reduxjs/toolkit';

const loadComments = () => {
  try {
    const saved = localStorage.getItem('sos_comments');
    return saved ? JSON.parse(saved) : null;
  } catch (err) {
    return null;
  }
};

const defaultComments = [
  {
    id: 1,
    author: 'Sarah J.',
    role: 'Verified Customer',
    content: 'My hair has never felt this soft and healthy. The shine is absolutely incredible, and I love that it\'s all natural.',
    stars: 5
  },
  {
    id: 2,
    author: 'Emma W.',
    role: 'Hair Stylist',
    content: 'The best investment for my hair. It smells divine and the results were visible from the very first wash. Pure luxury.',
    stars: 5
  }
];

const initialState = {
  comments: loadComments() || defaultComments
};

const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    addComment: (state, action) => {
      state.comments.push({
        id: Date.now(),
        ...action.payload
      });
      localStorage.setItem('sos_comments', JSON.stringify(state.comments));
    }
  }
});

export const { addComment } = commentsSlice.actions;
export default commentsSlice.reducer;
