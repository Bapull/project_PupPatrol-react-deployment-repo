import React, { useEffect, useState } from 'react'
import axios from '../lib/axios'
import { useNavigate } from 'react-router-dom'
import './TipsListTest.css'
import BackButton from '../components/backButton'
import Image from '../components/Image'; // Assuming you have an Image component
import { useAuth } from "../hooks/auth";

const BoardListTest = () => {
  // posts -> tips 
  const [tips, setTips] = useState([]);
  // 관리자 판단하는 state
  const [admin, setAdmin] = useState(false)
  const [view, setView] = useState(false);
  const navigator = useNavigate();
  const { user } = useAuth({ middleware: 'auth' })

  // 관리자인지 판단 후 setAdmin 
  useEffect(() => {
    if (user && user.role === 'admin') {
      setAdmin(true)
    }
  }, [user])

  useEffect(() => {
    // posts -> tips 
    axios.get('http://localhost:8000/api/posts')
      .then((response) => {
        setTips(response.data.data);
      })
  }, [])

  return (
    <div className='TipsListContainer'>
      <BackButton />
      <div>
        <div className='TipsPageImage'></div>
        <h1 className='TipsListPageTitle'>Tips</h1>
        {/* posts -> tips */}
        {tips.length > 0 ? (
          tips.map((item) => {
            // postContent는 JSON 형식의 문자열이므로 이를 배열로 파싱
            const postContentArray = JSON.parse(item.postContent);
            return (
              <li className='ListStyle' key={item.id}>
                <div className="dropdown">
                  <div className="dropbtn" onClick={()=>{setView(!view)}}>
                    <p className='TipsListTitle'>{item.postTitle}</p>
                    {/* 관리자인 경우에만 버튼 보임 */}
                    {admin ? <button onClick={() => navigator('/tipsList-detail',{state:item})}>수정,삭제페이지 이동</button> : null}
                  </div>
                  {/* 버튼을 눌러야 컨텐츠가 나옴 그러나 hover도 같이먹음 개선 필요 */}
                  {view ? <div className="dropdown-content">
                    <div className='dropdown-content-padding'>
                      {/* 각 postContent를 나열 */}
                      {postContentArray.length > 0 ? (
                        postContentArray.map((content, index) => (
                          content.startsWith('(IMAGE)') ? (
                            <Image key={index} folder={'board'} fileName={content.substring(7)} style={{ width: "200px" }} />
                          ) : (
                            <p key={index}>{content}</p>
                          )
                        ))
                      ) : (
                        <p>No content available</p>
                      )}
                      <div>Author: {item.postAuthor}</div>
                    </div>
                  </div> :null}
                </div>
              </li>
            );
          })
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </div>
  )
}

export default BoardListTest;
