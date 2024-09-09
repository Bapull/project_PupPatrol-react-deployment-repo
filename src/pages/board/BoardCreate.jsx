// 글 작성

import React, { createElement, useEffect, useRef, useState } from "react";
import { imageDeleteApi, imageUploadApi } from "../../utils/fetchAPI";
import { useNavigate } from "react-router-dom";
import BoardInputForm from "./BoardInputForm";
import axios from "../../lib/axios";
import "../../styles/board/BoardCreate.css";
import BackButton from "../../components/backButton";

const BoardTest = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const formData = new FormData();
    formData.append("postTitle", title);
    formData.append("postContent", JSON.stringify(content));
    if (content) {
      axios.post("http://localhost:8000/api/posts", formData).then(() => {
        navigate("/boardList");
      });
    }
  }, [content]);

  return (
    <div className="container">
      <BackButton />
      <div className="head1">
        제목
        <input
          type="text"
          onChange={(e) => setTitle(e.target.value)}
          value={title}
        />
      </div>
      <BoardInputForm setContent={setContent} />
    </div>
  );
};

export default BoardTest;
