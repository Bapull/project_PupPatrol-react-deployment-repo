// 글 목록 출력

import React, { useEffect, useState } from "react";
import axios from "../../lib/axios";
import { useNavigate } from "react-router-dom";
import "../../styles/board/BoardList.css";
import BackButton from "../../components/backButton";
import Profile from "../../components/Profile";

const BoardListTest = () => {
  const [posts, setPosts] = useState([]);
  const navigator = useNavigate();
  useEffect(() => {
    axios
      .get("http://localhost:8000/api/posts")
      .then((response) => setPosts(response.data.data));
  }, []);

  return (
    <div className="boardList">
      <BackButton />
      <Profile />
      <div className="buttonGroup">
        <button
          className="createButton"
          onClick={() => {
            navigator("/boardCreate");
          }}
        >
          글쓰기
        </button>
      </div>
      {posts?.map((item) => {
        return (
          <div className="descriptions">
            <p
              className="text"
              onClick={() => {
                navigator("/boardDescription", {
                  state: item,
                });
              }}
            >
              <h2>{item.postTitle}</h2> 작성자{item.postAuthor}
            </p>
            <div className="day">
              <p>
                작성일
                <span>: </span>
                {item.time.substring(0, 10)}
                <span> | </span>
                {item.time.substring(11, 16)}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default BoardListTest;
