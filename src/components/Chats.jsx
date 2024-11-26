import { useState, useEffect } from 'react';
import Chat from './Chat';
import { chatsData } from '../data/whatsapp';

function Chats({ inputValue, getFilter }) {
  const [chats, setChats] = useState(chatsData);
  const [selectedFilter, setSelectedFilter] = useState('todos');

  const applyFilter = () => {
    let newChats = chatsData;

    if (selectedFilter === 'chats') {
      newChats = newChats.filter((chat) => !chat.unreadMsgs);
    } else if (selectedFilter === 'fila') {
      newChats = newChats.filter((chat) => chat.unreadMsgs);
    } else if (selectedFilter === 'todos') {
      if (getFilter) {
        newChats = newChats.filter((chat) => chat.unreadMsgs); 
      }
      
    }

    if (inputValue.trim()) {
      newChats = newChats.filter((chat) =>
        chat.contact.toLowerCase().includes(inputValue.toLowerCase())
      );
    }

    setChats(newChats);
  };

  useEffect(() => {
    applyFilter();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inputValue, selectedFilter, getFilter]);

  return (
    <div className="flex flex-col overflow-y-scroll h-full">
      <div className="flex gap-2 items-center w-full min-h-[55px] mb-2 px-5">
        <div
          className={`px-4 py-2 text-sm rounded-full cursor-pointer ${selectedFilter === 'chats' ? 'bg-[#00A884] text-white' : 'bg-[#202C33] text-[#8696A0]'}`}
          onClick={() => setSelectedFilter('chats')}
        >
          <span className="font-medium font-custom">Chats {getFilter}</span>
        </div>

        <div
          className={`px-4 py-2 text-sm rounded-full cursor-pointer ${selectedFilter === 'fila' ? 'bg-[#00A884] text-white' : 'bg-[#202C33] text-[#8696A0]'}`}
          onClick={() => setSelectedFilter('fila')}
        >
          <span className="font-medium font-custom">Fila</span>
        </div>

        <div
          className={`px-4 py-2 text-sm rounded-full cursor-pointer ${selectedFilter === 'todos' ? 'bg-[#00A884] text-white' : 'bg-[#202C33] text-[#8696A0]'}`}
          onClick={() => setSelectedFilter('todos')}
        >
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
