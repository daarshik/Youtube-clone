import React from "react";
import moment from "moment";
import "./_comment.scss";

const Comment = ({ comment }) => {
  return (
    <div className="comment p-2 d-flex">
      <img
        src={comment?.authorProfileImageUrl}
        alt=""
        className="rounded-circle mr-3"
      />
      <div className="comment__body">
        <p className="comment__header mb-1">
          {comment?.authorDisplayName} •{" "}
          {moment(comment?.publishedAt).fromNow()}
        </p>
        <p className="mb-0">{comment?.textDisplay}</p>
      </div>
    </div>
  );
};

export default Comment;
// import React from "react";

// const Comment = () => {
//   return <div>Comment</div>;
// };

// export default Comment;
