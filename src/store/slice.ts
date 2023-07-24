import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {PostT} from "../utils/typest";
import axios from "axios";

type StateT = {
  search: string
  posts: PostT[]
  error: boolean
  loading: boolean
  currentPage: number
}

export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
  const response = await axios.get(`https://jsonplaceholder.typicode.com/posts`)
  return response.data
})

const initialState: StateT = {
  search: '',
  posts: [],
  currentPage: 1,
  loading: true,
  error: false
}

const slice = createSlice({
  name: 'slice',
  initialState,
  reducers: {
    setPage: (state, action) => {
      state.currentPage = action.payload;
    },
    setSearch: (state, action) => {
      state.search = action.payload
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.loading = true
      })
      .addCase(fetchPosts.rejected, (state) => {
        state.error = true
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.posts = action.payload;
        state.loading = false;
        state.error = false;
      })
  }
})


export const {setPage, setSearch} = slice.actions
export default slice.reducer