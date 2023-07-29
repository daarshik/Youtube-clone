import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import video from '../../components/video/Video';


export const getPopularVideo = createAsyncThunk(
    "video/getPopularVideo",
    async (video, { rejectWithValue, getState, dispatch }) => {
        // console.log("gbsbsr")   
        
              try{
                const { data }= await axios.get('https://youtube.googleapis.com/youtube/v3/videos', {
                params :  {
                    key: "AIzaSyA-vYrNxxK0xOtEWWgJ7EtMQbGjWLdczq0",
                    part: 'snippet, contentDetails,statistics',
                    chart:"mostPopular",
                    regionCode: "IN",
                    maxResults: 20,
                    pageToken:' ',
                }
            })
        //    console.log(data);
        //    console.log("gbsbsr")
           return data;
              } 
               catch (error) {
            console.log("Hiiiiiiiiiiiiii!!")
            if (!error?.response) {
                
              throw error;
            }
            return rejectWithValue(error.response.data);
          }
            
            
        }
)





const videoSlice = createSlice({
    name: 'video',
    initialState: {
        popularVideo: []
    },
    extraReducers: (builder) => {
        builder.addCase(getPopularVideo.fulfilled, (state, action) => {
            console.log(action.payload);
            state.popularVideo.push(action.payload);
        })
    }
})

export default videoSlice.reducer;
