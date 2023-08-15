import React from "react";
import "./_videoHorizontal.scss";
import { AiFillEye } from "react-icons/ai";
import { useState, useEffect } from "react";
import axios from "axios";

import moment from "moment";
import numeral from "numeral";

import { Col, Row } from "react-bootstrap";

const VideoHorizontal = ({ video }) => {
  const {
    id,
    snippet: {
      channelId,
      channelTitle,
      description,
      title,
      publishedAt,
      thumbnails,
    },
  } = video;
  const [views, setViews] = useState(0);
  const [duration, setDuration] = useState("");
  const [channelIcons, setChannelIcons] = useState(null);
  useEffect(() => {
    const getVideoDetails = async () => {
      try {
        const res = await axios.get(
          "https://youtube.googleapis.com/youtube/v3/videos",
          {
            params: {
              // key: "AIzaSyA-vYrNxxK0xOtEWWgJ7EtMQbGjWLdczq0",
              // key: "AIzaSyCpvR-jj2iUcVPBheWa0Ao4521AeaQc6hE",
              key: "AIzaSyBE0lzlapm87jHUqPbHH5Vj2CxFRl55qwA",
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
              // key: "AIzaSyCpvR-jj2iUcVPBheWa0Ao4521AeaQc6hE",
              key: "AIzaSyBE0lzlapm87jHUqPbHH5Vj2CxFRl55qwA",
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
  const seconds = moment.duration("100").asSeconds();
  const _duration = moment.utc(seconds * 1000).format("mm:ss");

  return (
    <Row className="videoHorizontal m-1 py-2 align-align-items-center">
      <img
        src="https://www.pngkey.com/png/full/114-1149878_setting-user-avatar-in-specific-size-without-breaking.png"
        alt=""
        className="videoHorizontal__thumbnail"
      />
      <Col xs={6} md={4} className="videoHorizontal__left">
        <span className="video__top__duration">{_duration}</span>
      </Col>
      <Col xs={6} md={8} className="videoHorizontal__right p-0">
        <p className="videoHorizontal__title mb-1">
          Be a full stack developer in 1 month
        </p>
        <div className="videoHorizontal__details">
          <AiFillEye /> {numeral(1000000).format("0.a")} Views •
          {moment("2020-06-09").fromNow()}
        </div>

        <div className="videoHorizontal__channel d-flex align-items-center my-1">
          <p>Itachi Uchiha</p>
        </div>
      </Col>
    </Row>
  );
};

export default VideoHorizontal;
