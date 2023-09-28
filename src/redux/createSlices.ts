// import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
// import getCurrentUser from "@/app/actions/getCurrentUser";
// import axios from "axios";

// export type initialStateType = {
//   content: any;
//   isLoading: boolean;
//   error: any;
// };

// //Generate pending fulfilled and rejected action types
// export const fetchContent = createAsyncThunk("user/fetchContent", () => {
//   return axios
//     .get("/api/createBoard")
//     .then((res) => res.data.map((content: any) => content));
// });

// const initialState: initialStateType = {
//   content: [],
//   isLoading: false,
//   error: null,
// };

// export const contentSlice = createSlice({
//   name: "content",
//   initialState,
//   reducers: {
//     getContent: (state, action) => {
//       state.content = action.payload;
//     }
//   },
//   extraReducers: (builder) => {
//     builder.addCase(fetchContent.pending, (state) => {
//       state.isLoading = true;
//     });
//     builder.addCase(fetchContent.fulfilled, (state, action) => {
//       state.isLoading = false;
//       state.content = action.payload;
//     });
//     builder.addCase(fetchContent.rejected, (state, action) => {
//       state.isLoading = false;
//       state.content = [];
//       state.error = action.error.message;
//     });
//   },
// });

// export default contentSlice.reducer;
