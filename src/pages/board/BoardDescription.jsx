// 글 상세 보기

import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Image from "../../components/Image";
import axios from "../../lib/axios";
import CommentTest from "./BoardComment";
import "../../styles/board/BoardDescription.css";
import BackButton from "../../components/backButton";
import Profile from "../../components/Profile";

const PrintTest = () => {
  const { state } = useLocation();
  const navigator = useNavigate();
  const [post, setPost] = useState([]);
  useEffect(() => {
    setPost(JSON.parse(state.postContent));
  }, []);

  return (
    <div className="boardDescription">
      <BackButton />
      <Profile />
      <h1 className="title">{state.postTitle}</h1>
      <p className="date">
        작성일
        <span>: </span>
        {state.time.substring(0, 4)}년<span> </span>
        {state.time.substring(5, 7)}월<span> </span>
        {state.time.substring(8, 10)}일<span> </span>
        {state.time.substring(11, 13)}시<spna> </spna>
        {state.time.substring(14, 16)}분
      </p>
      <div className="text">
        {post.map((item) => {
          if (item.substr(0, 7) === "(IMAGE)") {
            return (
              <Image
                folder={"board"}
                fileName={item.substr(7)}
                style={{ width: "200px" }}
              />
            );
          } else {
            return <p className="comentText">{item}</p>;
          }
        })}
      </div>
      <button
        className="updateButton"
        onClick={() => {
          navigator("/boardUpdate", {
            state: state,
          });
        }}
      >
        <img className="pencil" src="/images/Pencil.png" alt="update" />
      </button>
      <button
        className="delete"
        onClick={() => {
          axios
            .delete(`http://localhost:8000/api/posts/${state.id}`)
            .then(navigator("/boardList"));
        }}
      >
        <img className="gomi" src="/images/Gomi.png" alt="delete" />
      </button>

      <CommentTest postId={state.id} />
    </div>
  );
};

export default PrintTest;
