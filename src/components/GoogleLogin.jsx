import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const GoogleLogin = () => {
    const navigate = useNavigate();

    // 구글 인가코드 
    const params = new URLSearchParams(window.location.search);
    const code = params.get('code');

    // 구글 로그인 토큰 state
    const [googleLoginToken, setGoogleLoginToken] = useState(null);

    // 저장된 유저정보 
    const [userInformation,setUserInformation] = useState({})

    console.log(userInformation);

    // 구글 로그인 
    const onSubmitButtonGoogleLogin = (e) => {
        e.preventDefault();
        window.location.href = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${process.env.REACT_APP_GOOGLE_AUTH_CLIENT_ID}&redirect_uri=${process.env.REACT_APP_GOOGLE_AUTH_REDIRECT_URI}&response_type=code&scope=email profile`;
    };

    // 구글 로그아웃 
    const onLogoutButtonGoogle = (e) => {
        e.preventDefault();
        window.location.href = 'https://accounts.google.com/Logout';
    };

    // 백엔드로 토큰 전송
    useEffect(() => {
        if (googleLoginToken) {
            fetch('http://127.0.0.1:8000/api/auth/google', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ access_token: googleLoginToken.access_token })
            })
                .then((res) => res.json())
                .then((res) => {
                    setUserInformation(res.user);
                })
                .catch((error) => {
                    console.error('Error sending token to backend:', error);
                });
        }
    }, [googleLoginToken, navigate]);

    // 구글 access_token 가져오기 
    useEffect(() => {
        if (code) {
            const params = new URLSearchParams();
            params.append('code', code);
            params.append('client_id', process.env.REACT_APP_GOOGLE_AUTH_CLIENT_ID);
            params.append('client_secret', process.env.REACT_APP_GOOGLE_OAUTH_CLIENT_SECRET);
            params.append('redirect_uri', process.env.REACT_APP_GOOGLE_AUTH_REDIRECT_URI);
            params.append('grant_type', 'authorization_code'); // OAuth 2.0의 표준 grant_type

            fetch('https://oauth2.googleapis.com/token', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: params.toString(),
            })
                .then((res) => res.json())
                .then((data) => {
                    setGoogleLoginToken(data);
                })
                .catch((error) => {
                    console.error('Token exchange failed:', error);
                });
        }
    }, [code]);

    return (
        <div>
            <form onSubmit={onSubmitButtonGoogleLogin}>
                <button>Google Login</button>
            </form>
            <form onSubmit={onLogoutButtonGoogle}>
                <button>Google Logout</button>
            </form>
        </div>
    );
};

export default GoogleLogin;
