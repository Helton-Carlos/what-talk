import { useState } from 'react';
import Chats from './Chats';
import { FaFilter } from 'react-icons/fa';

function LeftMenu() {
  const [getFilter, setFilter] = useState(false);
  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  return (
    <div className="flex flex-col border-r border-neutral-700 w-full h-screen">
      <div className="flex justify-between items-center h-[60px] px-2">
        <div className="relative">
          <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
            <svg
              className="w-4 h-4 text-gray-500 dark:text-gray-400"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 20"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
              />
            </svg>
          </div>
          
          <input
            type="text"
            id="default-search"
            className="w-[367px] h-[32px] bg-[#202d33] text-white text-sm font-light outline-none px-10 py-2 rounded-lg placeholder:text-[#8796a1] placeholder:text-sm placeholder:font-light"
            placeholder="Pesquisa"
            required
            value={inputValue}
            onChange={handleInputChange}
          />
        </div>

        <button
          className={`text-xl m-2 p-2 rounded-full ${getFilter ? 'bg-emerald-500 text-white rounded-full hover:bg-emerald-700' : 'text-[#8796a1] hover:bg-[#3c454c]'}`}
          onClick={() => setFilter(!getFilter)}
        >
          <FaFilter />
        </button>
      </div>
      
      <Chats inputValue={inputValue} getFilter={getFilter} />
    </div>
  );
}

export default LeftMenu;
