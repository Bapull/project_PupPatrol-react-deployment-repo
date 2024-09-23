import React from 'react';
import { useAuth } from '../hooks/auth';
import '../styles/Menu.css';

const Menu = () => {
  const { user, logout } = useAuth(); // 로그아웃
  const [isOpen, setIsOpen] = React.useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <img src="/images/Menu.png" alt="menuIcon" className="MenuIcon" onClick={toggleMenu} />
      {isOpen && (
        <div className="Menu" onClick={toggleMenu}>
          <div className="menuContent" onClick={(e) => e.stopPropagation()}>
            <a href="/">Category</a>
            <a href="/dogSearch">Dog Search</a>
            <a href="/wantMBTI">D_MBTI</a>
            {/* 로그인 상태에 따라 다른 동작 수행 */}
            {user ? (
              <>
                <a href="/User">User</a>
                <a href="/" onClick={logout}>
                  Logout
                </a>
              </>
            ) : (
              <a href="/login">Login</a>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Menu;
