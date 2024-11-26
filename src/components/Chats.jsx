import { useState, useEffect } from 'react';
import Chat from './Chat';
import { chatsData } from '../data/whatsapp';

function Chats({ filter }) {
  const [chats, setChats] = useState(chatsData);

  useEffect(() => {
    const newChats = filter
      ? chatsData.filter((chat) => chat.unreadMsgs)
      : chatsData;
    setChats(newChats);
  }, [filter]);

  return (
    <div className="flex flex-col overflow-y-scroll h-full">
      <div className="flex gap-2 items-center w-full min-h-[55px] mb-2 px-5">
        <div className="bg-[#0A332C] px-4 py-2 text-sm text-[#00A884] rounded-full hover:cursor-pointer">
          <span className="font-medium font-custom">Chats</span>
        </div>

        <div className="bg-[#202C33] px-4 py-2 text-sm text-[#8696A0] rounded-full hover:cursor-pointer">
          <span className="font-medium font-custom">Fila</span>
        </div>

        <div className="bg-[#202C33] px-4 py-2 text-sm text-[#8696A0] rounded-full hover:cursor-pointer">
          <span className="font-medium font-custom">Todos</span>
        </div>
      </div>

      {chats.map((chat, i) => (
        <Chat
          key={`${chat.contact}-${i}`}
          pp={chat.pp}
          contact={chat.contact}
          msg={chat.msg}
          time={chat.time}
          unreadMsgs={chat.unreadMsgs}
          active={i === 0}
        />
      ))}
    </div>
  );
}

export default Chats;
