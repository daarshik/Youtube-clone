import React, { useEffect } from "react";
import "./_metaDataVideo.scss";
import moment from "moment";
import numeral from "numeral";
import { MdThumbUp, MdThumbDown } from "react-icons/md";
import ReactShowMoreText from "react-show-more-text";
import { useDispatch, useSelector } from "react-redux";
import { getChannelDetails } from "../../redux/slices/channelslices";

const MetaDataVideo = ({ item }) => {
  const dispatch = useDispatch();

  const { channelInfo } = useSelector((state) => state?.channels);

  useEffect(() => {
    console.log(item?.snippet?.channelId);
    dispatch(getChannelDetails(item?.snippet?.channelId));
  }, []);

  return (
    <div className="videoData py-2">
      <div className="videoData__top">
        <h5>{item?.snippet?.title}</h5>
        <div className="d-flex justify-content-between align-items-center py-1">
          <span>
            {numeral(item?.statistics?.viewCount).format("0.a")} views •
            {moment(item?.snippet?.publishedAt).fromNow()}
          </span>

          <div>
            <span className="mr-3">
              <MdThumbUp size={26} />
              {numeral(item?.statistics?.likeCount).format("0.a")}
            </span>
            <span className="mr-3">
              <MdThumbDown size={26} />
              {numeral(item?.statistics?.dislikeCount).format("0.a")}
            </span>
          </div>
        </div>
      </div>
      <div className="videoData__channel d-flex justify-content-between align-items-center my-2 py-2">
        <div className="d-flex mx-1">
          <img
            src={channelInfo?.snippet?.thumbnails?.default?.url}
            alt=""
            className="rounded-circle mr-3"
          />
          <div className="d-flex flex-column px-2">
            <span>{item?.snippet?.channelTitle}</span>
            <span>
              {" "}
              {numeral(channelInfo?.statistics?.subscriberCount).format(
                "0.a"
              )}{" "}
              Subscribers
            </span>
          </div>
        </div>

        <button className="btn border-0 p-2 m-2">Subscribe</button>
      </div>
      <div className="videoData__description">
        <ReactShowMoreText
          lines={3}
          more="SHOW MORE"
          less="SHOW LESS"
          anchorClass="reactShowMoreText"
          expanded={false}
        >
          {item?.snippet?.description}
        </ReactShowMoreText>
      </div>
    </div>
  );
};

export default MetaDataVideo;
