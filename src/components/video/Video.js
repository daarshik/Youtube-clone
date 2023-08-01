import React, { useEffect, useState } from 'react'
import "./_video.scss"
import { AiFillEye } from 'react-icons/ai'
import axios from 'axios'
import moment from 'moment'
import numeral from 'numeral'

const Video = ({item}) => {

  

  const {
    id,
    snippet: {
      channelId,
      channelTitle,
      title,
      publishedAt,
      thumbnails: {
        medium
      }
    }
  } = item;
  
  useEffect(() => {
    const getVideoDetails = async () => {
      try {
        const res = await axios.get('https://youtube.googleapis.com/youtube/v3/videos', {
          params: {
            key: "AIzaSyA-vYrNxxK0xOtEWWgJ7EtMQbGjWLdczq0",
            part: 'contentDetails,statistics',
            id: id,
          },
        });
        const { data: { items } } = res;
        // console.log(res);
        
        if (items && items.length > 0) {
          // Use optional chaining and nullish coalescing to handle potential undefined properties
          const duration = items[0]?.contentDetails?.duration ?? '00:00';
          const views = items[0]?.statistics?.viewCount ?? 0;
    
          setDuration(duration);
          setViews(views);
        } else {
          console.error('No video details found for the given video id');
        }
      } catch (error) {
        console.error("Error fetching video details:", error);
      }
    };
    getVideoDetails();
  }, [id]);

  useEffect(() => {
    const getChannelsIcons = async () => {
      try {
        const res = await axios.get('https://youtube.googleapis.com/youtube/v3/channels', {
          params: {
            key: "AIzaSyA-vYrNxxK0xOtEWWgJ7EtMQbGjWLdczq0",
            part: 'snippet',
            id: channelId,
          },
        });
        const { data: { items } } = res;
        // console.log(res);
        if (items && items.length > 0) { // Check if items array is not empty
          setChannelIcons(items[0].snippet.thumbnails.default);
        } else {
          // console.log(res);
          // Handle the case when items array is empty
          console.error('No channel icons found for the given channelId');
        }
      } catch (error) {
        console.error("Error fetching channel icons:", error);
      }
    };
    getChannelsIcons();
  }, []);



  const [views, setViews] = useState(0);
  const [duration, setDuration] = useState("");
  const [channelIcons, setChannelIcons] = useState(null);


  const seconds = moment.duration(duration).asSeconds();
  const _duration = moment.utc(seconds * 1000).format("mm:ss")


  return (
    <div className="video">
      <div className="video__top">
        <img src={medium?.url} alt=''/>
        <span>{_duration}</span>
      </div>
      <div className="video__title">
        {title}
      </div>
      <div className="video__details">
        <span>
        <AiFillEye />
        {numeral(views).format('0.a')} views 
        </span>
        <span>•</span>
        <span>{moment(publishedAt).fromNow()}</span> 
      </div>
      <div className="video__channel">
        <img src={channelIcons?.url} alt=''/>
        <p>{channelTitle}</p>
      </div>
    </div>
  )
}

export default Video

