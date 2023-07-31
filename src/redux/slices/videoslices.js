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
            // console.log("Hiiiiiiiiiiiiii!!")
            if (!error?.response) {
                
              throw error;
            }
            return rejectWithValue(error.response.data);
          }
            
            
        }
)

// export const getVideoByCategory = createAsyncThunk(
//     "video/getVideoByCategory",
//     async (keyword, { rejectWithValue, getState, dispatch }) => {
//         // console.log("gbsbsr")   
        
//               try{
//                 const { data }= await axios.get('https://youtube.googleapis.com/youtube/v3/search', {
//                 params :  {
//                     key: "AIzaSyA-vYrNxxK0xOtEWWgJ7EtMQbGjWLdczq0",
//                     part: 'snippet',
//                     maxResults: 20,
//                     pageToken:getState().video.nextPageToken,
//                     q: keyword,
//                     type: 'video'
//                 }
//             })
//            console.log(data);
//         //    console.log("gbsbsr")
//            return data;
//               } 
//                catch (error) {
//             // console.log("Hiiiiiiiiiiiiii!!")
//             if (!error?.response) {
                
//               throw error;
//             }
//             return rejectWithValue(error.response.data);
//           }
            
            
//         }
// )





const videoSlice = createSlice({
    name: 'video',
    initialState: {
        popularVideo: {
            items: [
                {
                    id: '',
                    snippet: {
                        channelId: '',
                        channelTitle: '',
                        title: '',
                        publishedAt: '',
                        thumbnails: { 
                            medium: ''
                        }
                    }
                }
            ],
            // nextPageToken: null,
            // activeCategory: 'All'
        },

    },
    extraReducers: (builder) => {
        builder.addCase(getPopularVideo.fulfilled, (state, action) => {
            // console.log(action.payload.items);
            
            state.popularVideo.items=action.payload.items;
            // state.popularVideo.nextPageToken=action.payload.nextPageToken;
            
        })
        // builder.addCase(getVideoByCategory.fulfilled, (state, action) => {
        //     state.popularVideo.activeCategory=action.payload.category;
        // })
    }
})

export default videoSlice.reducer;
