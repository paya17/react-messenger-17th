import React, { useState, useEffect } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { currentUserState, allChatRoomsInfoState } from '../../state/atom';
import { IChat, IUser } from '../../interface/interface';
import styled from 'styled-components';
import { IoIosSend } from 'react-icons/io';

type ChatInputProps = {
  friendInfo: IUser;
  chatList: IChat[];
};

const ChatInput = ({ friendInfo, chatList }: ChatInputProps) => {
  const [text, setText] = useState('');
  const [newChatList, setNewChatList] = useState(chatList);
  const currentUser = useRecoilValue(currentUserState);
  const [allChatRoomsInfo, setAllChatRoomsInfo] = useRecoilState(
    allChatRoomsInfoState
  );

  const currentTime = () => {
    let hours = ('0' + new Date().getHours()).slice(-2);
    let minutes = ('0' + new Date().getMinutes()).slice(-2);

    return hours + ':' + minutes;
  };

  const addChat = () => {
    setNewChatList([
      ...newChatList,
      { userId: currentUser.userId, content: text, time: currentTime() },
    ]);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (text.trim()) {
      addChat();
      setText(''); //초기화
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setText(e.target.value);

  useEffect(() => {
    setAllChatRoomsInfo(
      allChatRoomsInfo.map((chatRoomInfo) =>
        chatRoomInfo.userId === friendInfo.userId
          ? {
              userId: friendInfo.userId,
              chatList: [...newChatList],
            }
          : chatRoomInfo
      )
    );
  }, [newChatList]);

  return (
    <SendForm onSubmit={handleSubmit}>
      <SendInput
        type="text"
        value={text}
        onChange={handleChange}
        required
      ></SendInput>
      <SendBtn>
        <IoIosSend />
      </SendBtn>
    </SendForm>
  );
};

export default ChatInput;

const SendForm = styled.form`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1.2rem 1rem;
  background-color: white;

  border-radius: 0 0 2.3rem 2.3rem;
`;

const SendInput = styled.input`
  border: 1px solid rgb(179, 177, 177);
  border-radius: 20px;
  width: 22rem;
  height: 2.5rem;
  font-family: 'IBMPlexSansKR-Regular';

  &:focus {
    outline: none;
  }
`;

const SendBtn = styled.button`
  padding: 0.25rem;
  margin-left: 0.3rem;

  display: flex;
  justify-content: center;
  align-items: center;

  font-size: 2rem;
`;
