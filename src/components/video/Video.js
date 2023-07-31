import React, { useEffect, useState } from 'react'
import "./_video.scss"
import { AiFillEye } from 'react-icons/ai'
import { useSelector } from 'react-redux'
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
      publlishedAt,
      thumbnails: {
        medium
      }
    }
  } = item;
  

  useEffect(() => {
    const get_video_details = async () => {
      const res= await axios.get('https://youtube.googleapis.com/youtube/v3/videos', {
          params :  {
            key: "AIzaSyA-vYrNxxK0xOtEWWgJ7EtMQbGjWLdczq0",
            part: 'contentDetails,statistics',
            id:id
          }
          })
        const { data: {items}} = res;
        // console.log(items);
      setDuration(items[0].contentDetails.duration);
      setViews(items[0].statistics.viewCount);
      }
  get_video_details();
},[]);

useEffect(() => {
  const get_channels_icons = async () => {
    const res= await axios.get('https://youtube.googleapis.com/youtube/v3/channels', {
        params :  {
          key: "AIzaSyA-vYrNxxK0xOtEWWgJ7EtMQbGjWLdczq0",
          part: 'snippet',
          id:channelId
        }
        })
      const { data: {items}} = res;
      // console.log(items);
      setChannelIcons(items[0].snippet.thumbnails.default);
    }
    get_channels_icons();
},[]);

  const [views, setViews] = useState(null);
  const [duration, setDuration] = useState(null);
  const [channelIcons, setChannelIcons] = useState(null);


  const seconds = moment.duration(duration).asSeconds;
  const _duration = moment.utc(seconds * 1000).format("mm:ss")


  return (
    <div className="video">
      <div className="video__top">
        <img src={medium.url} alt=''/>
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
        <span>{moment(publlishedAt).fromNow()}</span> 
      </div>
      <div className="video__channel">
        <img src={channelIcons?.url} alt=''/>
        <p>{channelTitle}</p>
      </div>
    </div>
  )
}

export default Video