import React from "react";
import "./_videoHorizontal.scss";
import { AiFillEye } from "react-icons/ai";

import moment from "moment";
import numeral from "numeral";

import { Col, Row } from "react-bootstrap";

const VideoHorizontal = () => {
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
