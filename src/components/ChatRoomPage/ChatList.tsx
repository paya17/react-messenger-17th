import React, { useEffect, useRef } from 'react';
import { IChat } from '../../interface/interface';
import Chat from './Chat';
import styled from 'styled-components';

type ChatListProps = {
  chatList: IChat[];
};

const ChatList = ({ chatList }: ChatListProps) => {
  const chatListRef = useRef<HTMLDivElement>(null);

  const moveToBottom = () => {
    if (chatListRef.current) {
      chatListRef.current.scrollTop = chatListRef.current.scrollHeight;
    }
  };

  useEffect(() => {
    moveToBottom();
  });

  return (
    <ChatListBox ref={chatListRef}>
      {chatList.map((chat, idx: number) => (
        <Chat key={idx} chat={chat} />
      ))}
    </ChatListBox>
  );
};

export default ChatList;

const ChatListBox = styled.div`
  flex-basis: 80%;
  overflow-y: scroll;

  background-color: #9bbbd4;

  ::-webkit-scrollbar {
    width: 0.32rem;
  }

  ::-webkit-scrollbar-thumb {
    background-color: #b5b4b4;
  }

  /*
  background-image: url('../../../public/Imgs/ChatroomImg.jpg');
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  */
`;
