import React from 'react'
import "./_video.scss"
import { AiFillEye } from 'react-icons/ai'

const video = () => {
  return (
    <div className="video">
      <div className="video__top">
        <img src='https://i.ytimg.com/vi/8SjJBcQsHO8/hq720.jpg?sqp=-…AHAAQbQAQE=&rs=AOn4CLAKeDHvSofdftl_uBEB8HcKHlP2XQ' alt=''/>
        <span>05:43</span>
      </div>
      <div className="video__title">
        Create app in 5 minutes by Ana de armas
      </div>
      <div className="video__details">
        <span>
        <AiFillEye />
        5m views •
        </span>
        <span>5 days ago</span> 
      </div>
      <div className="video__channel">
        <img src='https://yt3.ggpht.com/ytc/AOPolaRZ8ouNUYr0bapLKJVbD5-rzuREVNnVXyPJjd4Otg=s68-c-k-c0x00ffffff-no-rj' alt=''/>
        <p>Rainbow Hat Jr</p>
      </div>
    </div>
  )
}

export default video