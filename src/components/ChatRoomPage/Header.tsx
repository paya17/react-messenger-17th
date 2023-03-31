import React from 'react';
import { useRecoilState } from 'recoil';
import { currentUserState } from '../../state/atom';
import userData from '../../db/userData.json';
import styled from 'styled-components';

const Header = () => {
  const [currentUser, setCurrentUser] = useRecoilState(currentUserState);

  const toggleUser = () => {
    if (currentUser.userId === 0) {
      setCurrentUser(userData[1]); //나중에 수정 (현재 채팅 상대)
    } else {
      setCurrentUser(userData[0]);
    }
  };

  return (
    <HeaderBox>
      <button>◀</button> {/* 채팅룸 나가기 버튼 */}
      <UserInfo onClick={toggleUser}>
        <UserImg
          src={`${process.env.PUBLIC_URL}/Imgs/${currentUser.userImg}.jpg`}
          alt={currentUser.userName}
        />
        <UserName>{currentUser.userName}</UserName>
      </UserInfo>
    </HeaderBox>
  );
};

export default Header;

const HeaderBox = styled.header`
  display: flex;
  align-items: center;
`;

const UserInfo = styled.button`
  display: flex;
  align-items: center;
`;

const UserImg = styled.img`
  width: 4rem;
  height: 4rem;
  border-radius: 1rem;
`;

const UserName = styled.div`
  font-size: 2rem;
`;
