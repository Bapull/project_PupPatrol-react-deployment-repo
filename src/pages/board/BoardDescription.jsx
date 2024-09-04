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
      <h1>{state.postTitle}</h1>
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
          return <p>{item}</p>;
        }
      })}
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

      <CommentTest postId={state.id} />
    </div>
  );
};

export default PrintTest;
