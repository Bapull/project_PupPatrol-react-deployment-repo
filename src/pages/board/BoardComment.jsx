// 댓글

import React, { useEffect, useState } from "react";
import axios from "../../lib/axios";

const CommentTest = ({ postId }) => {
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState("");
  const [render, setRender] = useState(false);
  useEffect(() => {
    axios
      .get(`http://localhost:8000/api/comments/${postId}`)
      .then((response) => setComments(response.data.data));
  }, [render]);
  const onClick = () => {
    axios
      .post("http://localhost:8000/api/comments", {
        commentPostId: postId,
        commentContent: comment,
      })
      .then(() => {
        setRender((prev) => !prev);
      });
  };
  const onUpdate = (id) => {
    const formData = new FormData();
    formData.append("_method", "PUT");
    formData.append("commentPostId", postId);
    formData.append("commentContent", comment);
    axios
      .post(`http://localhost:8000/api/comments/${id}`, formData)
      .then(() => {
        setRender((prev) => !prev);
      });
  };
  const onDelete = (id) => {
    axios.delete(`http://localhost:8000/api/comments/${id}`).then(() => {
      setRender((prev) => !prev);
    });
  };
  return (
    <div>
      <input
        type="text"
        value={comment}
        onChange={(e) => setComment(e.target.value)}
      />
      <button onClick={onClick}>작성</button>
      <div>
        {comments.map((item) => {
          return (
            <>
              <div>{item.commentAuthor}</div>
              <div>{item.commentContent}</div>
              <div>{item.commentTime}</div>
              <button
                onClick={() => {
                  onUpdate(item.id);
                }}
              >
                수정
              </button>
              <button
                onClick={() => {
                  onDelete(item.id);
                }}
              >
                삭제
              </button>
            </>
          );
        })}
      </div>
    </div>
  );
};

export default CommentTest;
