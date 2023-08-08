import React, { useEffect, useState } from "react";
import "./_comments.scss";
import Comment from "../comment/Comment";
import { useDispatch, useSelector } from "react-redux";
import {
  addComment,
  getCommentVideoById,
} from "../../redux/slices/commentslices";

const Comments = ({ channelId, videoId }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCommentVideoById(videoId));
  }, []);

  const [text, setText] = useState("");

  const { items } = useSelector((state) => state?.commentList?.comments);
  // console.log(items);
  const _comments = items?.map(
    (comment) => comment?.snippet?.topLevelComment?.snippet
  );
  const handleComment = (e) => {
    e.preventDefault();
    if (text.length === 0) return;
    const obj = {
      snippet: {
        channelId: channelId,
        videoId: videoId,
        topLevelComment: {
          snippet: {
            textOriginal: text,
          },
        },
      },
    };
    dispatch(addComment(obj));
  };
  return (
    <div className="comments">
      <p>1234 Comments</p>
      <div className="comments__form d-flex w-100 my-2">
        <img
          src="https://www.pngkey.com/png/full/114-1149878_setting-user-avatar-in-specific-size-without-breaking.png"
          alt=""
          className="rounded-circle mr-3"
        />
        <form onSubmit={handleComment} className="d-flex flex-grow-1">
          <input
            type="text"
            className="flex-grow-1"
            placeholder="Write a comment..."
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <button className="border-0 p-2">Comment</button>
        </form>
      </div>
      <div className="comments__list">
        {_comments.map((comment, i) => (
          <Comment comment={comment} key={i} />
        ))}
      </div>
    </div>
  );
};

export default Comments;
