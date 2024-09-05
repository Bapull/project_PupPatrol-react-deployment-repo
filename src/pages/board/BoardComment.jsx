// 댓글

import React, { useEffect, useState } from "react";
import axios from "../../lib/axios";
import "../../styles/board/BoardComment.css";
import { useAuth } from "../../hooks/auth";

const CommentTest = ({ postId }) => {
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState("");
  const [render, setRender] = useState(false);
  const { user } = useAuth({ middleware: "auth" });

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
    <div className="boardComment">
      <div className="content">
        <hr className="underBar" />
        <p className="comment"> 댓글 </p>
        <hr />
        <div className="writer">ID: {user.email}</div>
        <input
          type="text"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="댓글 입력"
        />
        <button onClick={onClick}>작성</button>
        <div className="commentGroup">
          {comments.map((item) => {
            return (
              <div className="comments">
                <div className="email">{item.commentAuthor}</div>
                <div className="text">{item.commentContent}</div>
                <div className="day">
                  {item.commentTime.substring(0, 10)}
                  <span> | </span>
                  {item.commentTime.substring(11, 16)}
                </div>
                <button
                  className="update"
                  onClick={() => {
                    onUpdate(item.id);
                  }}
                >
                  <img
                    className="pencil"
                    src="/images/Pencil.png"
                    alt="update"
                  />
                </button>
                <button
                  className="delete"
                  onClick={() => {
                    onDelete(item.id);
                  }}
                >
                  <img className="gomi" src="/images/Gomi.png" alt="delete" />
                </button>
                <hr />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default CommentTest;
