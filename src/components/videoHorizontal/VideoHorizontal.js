import React from "react";
import "./_videoHorizontal.scss";
import { AiFillEye } from "react-icons/ai";
import { useState, useEffect } from "react";
import axios from "axios";

import moment from "moment";
import numeral from "numeral";

import { Col, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const VideoHorizontal = ({ video, searchScreen }) => {
  const {
    id,
    snippet: {
      channelId,
      channelTitle,
      description,
      title,
      publishedAt,
      thumbnails: { high },
    },
  } = video;

  const [views, setViews] = useState(0);
  const [duration, setDuration] = useState("");
  const [channelIcons, setChannelIcons] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const getVideoDetails = async () => {
      try {
        const res = await axios.get(
          "https://youtube.googleapis.com/youtube/v3/videos",
          {
            params: {
              // key: "AIzaSyA-vYrNxxK0xOtEWWgJ7EtMQbGjWLdczq0",
              key: "AIzaSyCpvR-jj2iUcVPBheWa0Ao4521AeaQc6hE",
              // key: "AIzaSyBE0lzlapm87jHUqPbHH5Vj2CxFRl55qwA",
              part: "contentDetails,statistics",
              id: id?.videoId ?? id,
            },
          }
        );
        const {
          data: { items },
        } = res;
        // console.log(res);

        if (items && items.length > 0) {
          // Use optional chaining and nullish coalescing to handle potential undefined properties
          const duration = items[0]?.contentDetails?.duration ?? "00:00";
          const views = items[0]?.statistics?.viewCount ?? 0;

          setDuration(duration);
          setViews(views);
        } else {
          console.error("No video details found for the given video id");
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
        const res = await axios.get(
          "https://youtube.googleapis.com/youtube/v3/channels",
          {
            params: {
              // key: "AIzaSyA-vYrNxxK0xOtEWWgJ7EtMQbGjWLdczq0",
              key: "AIzaSyCpvR-jj2iUcVPBheWa0Ao4521AeaQc6hE",
              // key: "AIzaSyBE0lzlapm87jHUqPbHH5Vj2CxFRl55qwA",
              part: "snippet",
              id: channelId,
            },
          }
        );
        const {
          data: { items },
        } = res;
        // console.log(res);
        if (items && items.length > 0) {
          // Check if items array is not empty
          setChannelIcons(items[0].snippet.thumbnails.default);
        } else {
          // console.log(res);
          // Handle the case when items array is empty
          console.error("No channel icons found for the given channelId");
        }
      } catch (error) {
        console.error("Error fetching channel icons:", error);
      }
    };
    getChannelsIcons();
  }, [channelId]);

  const isVideo = id?.kind === "youtube#video";
  const seconds = moment.duration(duration).asSeconds();
  const _duration = moment.utc(seconds * 1000).format("mm:ss");
  const handleClick = () => {
    isVideo
      ? navigate(`/watch/${id.videoId}`)
      : navigate(`/channel/${channelId}`);
  };

  const thumbnail = !isVideo && "videoHorizontal_thumbnail-channel";
  return (
    <Row
      className="videoHorizontal m-1 py-2 align-items-center"
      onClick={handleClick}
    >
      <Col xs={6} md={4} className="videoHorizontal__left">
        <img
          src={high.url}
          alt=""
          className={`videoHorizontal__thumbnail ${thumbnail}`}
        />
        {isVideo && (
          <span className="videoHorizontal__duration">{_duration}</span>
        )}
      </Col>
      <Col xs={6} md={8} className="videoHorizontal__right p-0">
        <p className="videoHorizontal__title mb-1">{title}</p>
        {isVideo && (
          <div className="videoHorizontal__details">
            <AiFillEye /> {numeral(views).format("0.a")} Views •
            {moment(publishedAt).fromNow()}
          </div>
        )}
        {/* {isVideo && <p className="mt-1">{description}</p>}*/}
        <div className="videoHorizontal__channel d-flex align-items-center my-1">
          {isVideo && <img src={channelIcons?.url} />}

          <p className="mb-0">{channelTitle}</p>
        </div>
      </Col>
    </Row>
  );
};

export default VideoHorizontal;
