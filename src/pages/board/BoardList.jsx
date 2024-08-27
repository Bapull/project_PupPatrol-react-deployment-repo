// 글 목록 출력

import React, { useEffect, useState } from "react";
import axios from "../../lib/axios";
import { useNavigate } from "react-router-dom";

const BoardListTest = () => {
  const [posts, setPosts] = useState([]);
  const navigator = useNavigate();
  useEffect(() => {
    axios
      .get("http://localhost:8000/api/posts")
      .then((response) => setPosts(response.data.data));
  }, []);

  return (
    <div>
      {posts?.map((item) => {
        return (
          <>
            <p
              onClick={() => {
                navigator("/boardDescription", {
                  state: item,
                });
              }}
            >
              <h2>{item.postTitle}</h2> 작성자{item.postAuthor}
            </p>
          </>
        );
      })}
    </div>
  );
};

export default BoardListTest;
