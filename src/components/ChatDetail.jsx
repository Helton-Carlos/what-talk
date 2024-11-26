import { useState, useEffect, useRef } from 'react';
import Message from './Message';
import RoundedBtn from './Common/RoundedBtn';
import { messagesData } from '../data/whatsapp';
import { TbArrowsRightLeft } from 'react-icons/tb';
import { MdSend } from 'react-icons/md';
import { HiDotsVertical } from 'react-icons/hi';
import { AiOutlineThunderbolt } from 'react-icons/ai';
import { BsFillMicFill } from 'react-icons/bs';
import { IoAddOutline } from 'react-icons/io5';
import { cs1, cs2 } from '../assets/whatsapp';
import { getTime } from '../logic/whatsapp';
import { HiOutlinePhoneXMark } from 'react-icons/hi2';

function ChatDetail() {
  const [messages, setMessages] = useState(messagesData);
  const [typing, setTyping] = useState(false);

  const inputRef = useRef(null);
  const bottomRef = useRef(null);

  const addMessage = (msg) => {
    const newMessages = [...messages, msg];
    setMessages(newMessages);
  };

  const handleImgUpload = () => {
    addMessage({
      img: cs2,
      time: getTime(),
      sent: true,
    });
  };

  const handleInputChange = () => {
    inputRef.current.value.length === 0 ? setTyping(false) : setTyping(true);
  };

  const handleInputSubmit = () => {
    if (inputRef.current.value.length > 0) {
      addMessage({
        msg: inputRef.current.value,
        time: getTime(),
        sent: true,
      });
      inputRef.current.value = '';
      inputRef.current.focus();
      setTyping(false);
    }
  };

  useEffect(() => {
    bottomRef.current?.scrollIntoView({
      behavior: 'smooth',
    });
  }, [messages]);

  useEffect(() => {
    const listener = (e) => {
      if (e.code === 'Enter') handleInputSubmit();
    };

    document.addEventListener('keydown', listener);
    return () => document.removeEventListener('keydown', listener);
  });

  return (
    <div className="flex flex-col h-screen">
      <div className="flex justify-between bg-[#202d33] h-[60px] p-3">
        <div className="flex items-center">
          <img
            src={cs1}
            alt="profile_picture"
            className="rounded-full w-[45px] h-[45px] mr-5"
          />
          <div className="flex flex-col mr-4">
            <h1 className="text-white font-medium font-custom">Coding Spot</h1>

            <p className="text-[#8796a1] text-xs font-custom">(55519982985)</p>
          </div>

          <div className="flex items-center gap-5">
            <div className="bg-[#0A332C] px-4 py-2 text-sm text-[#00A884] rounded-full hover:cursor-pointer">
              <span className="font-medium font-custom">Tag</span>
            </div>

            <div className="bg-[#0A332C] px-4 py-2 text-sm text-[#00A884] rounded-full hover:cursor-pointer">
              <span className="font-medium font-custom">Tag</span>
            </div>

            <div className="bg-[#14406F] px-4 py-2 text-sm text-[#007BFC] rounded-full hover:cursor-pointer">
              <span className="font-medium font-custom">
                Marcar como não lida
              </span>
            </div>
          </div>
        </div>

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
            className="rounded-lg bg-[#111B21] text-[#8796a1] text-sm font-light outline-none px-20 py-3 w-[344] h-[32px] placeholder:text-[#8796a1] placeholder:text-sm placeholder:font-light"
            placeholder="Search"
            required
          />
        </div>

        <div className="flex justify-between items-center gap-5">
          <RoundedBtn
            icon={<TbArrowsRightLeft className="text-gray-300 size-5" />}
          />
          <RoundedBtn
            icon={<HiOutlinePhoneXMark className="text-red-500 size-5" />}
          />
          <RoundedBtn icon={<HiDotsVertical />} />
        </div>
      </div>

      <div
        className="bg-[#0a131a] bg-[url('assets/images/bg.webp')] bg-contain overflow-y-scroll h-full"
        style={{ padding: '12px 7%' }}
      >
        {messages &&
          Array.isArray(messages) &&
          messages.map((msg, index) => (
            <Message
              key={index}
              msg={msg.msg}
              time={msg.time}
              isLink={msg.isLink}
              img={msg.img}
              sent={msg.sent}
            />
          ))}

        <div ref={bottomRef} />
      </div>

      <div className=" w-full h-[70px] bg-[#202d33] flex items-center gap-2 py-2">
        <div className="flex items-center gap-2 mx-2">
          <RoundedBtn icon={<IoAddOutline />} onClick={handleImgUpload} />

          <RoundedBtn
            icon={<AiOutlineThunderbolt />}
            onClick={handleImgUpload}
          />

          <RoundedBtn
            icon={
              <svg
                width="20"
                height="22"
                viewBox="0 0 20 22"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M2.58597 20.6506C3.19843 20.0939 3.8109 19.4814 4.42337 18.9246C4.53472 18.8132 4.64608 18.7019 4.75744 18.5905C4.98015 18.3678 5.20287 18.1451 5.42558 17.9781C5.59262 17.811 5.53694 17.7554 5.87101 17.7554C6.76187 17.7554 7.65273 17.7554 8.54359 17.7554C10.9378 17.7554 13.332 17.7554 15.7261 17.7554C16.9511 17.7554 18.009 17.644 18.009 16.0293C18.009 13.5794 18.009 11.1853 18.009 8.7354C17.3408 8.7354 16.6727 8.7354 16.0045 8.7354C16.0045 11.0739 16.0045 13.4124 16.0045 15.6952C12.3297 15.6952 8.65495 15.6952 4.98015 15.6952C4.8688 15.6952 4.03362 16.5304 3.86658 16.6975C3.47683 17.0315 3.14276 17.3656 2.753 17.6997C2.64165 17.811 2.53029 17.9224 2.41893 18.0337C2.30757 18.1451 2.14054 18.2565 2.02918 18.3678C2.02918 14.1919 2.02918 9.96033 2.02918 5.78442C5.03583 5.78442 8.04248 5.78442 11.0491 5.78442C11.0491 5.11628 11.0491 4.39245 11.0491 3.72431C8.2652 3.72431 5.48126 3.72431 2.64165 3.72431C-0.309326 3.72431 0.0247461 4.44813 0.0247461 7.12071C0.0247461 11.2966 -0.0309326 15.4168 0.0247461 19.5928C0.0247461 21.4301 1.30536 21.8756 2.58597 20.6506ZM16.5057 3.50159C16.5057 2.4437 18.009 2.55506 18.009 3.44592C18.009 4.11406 17.1738 4.44813 16.7284 4.0027C16.617 3.89135 16.5057 3.61295 16.5057 3.50159ZM11.9957 6.34121C11.9957 7.12071 11.9957 7.95589 11.9957 8.7354C12.8865 8.7354 13.8331 8.7354 14.7239 8.7354C14.7239 8.457 14.7239 8.12293 14.7239 7.84454C15.0023 7.84454 15.2807 7.84454 15.5591 7.84454C15.5591 7.56614 15.5591 7.28775 15.5591 7.00936C16.3386 7.00936 16.0602 7.06503 16.784 6.34121C17.1181 6.00714 17.5079 6.50825 18.6214 5.8401C20.4588 4.78221 20.4588 1.99827 18.3987 0.940373C17.2852 0.383585 16.0602 0.717658 15.3364 1.44148C14.9466 1.83123 14.7239 2.16531 14.5569 2.72209C14.4455 3.11184 14.5012 3.27888 14.4455 3.66863C14.4455 3.89135 14.2228 4.0027 14.0001 4.22542C13.8331 4.39245 11.9957 6.17417 11.9957 6.34121Z"
                  fill="#8696A0"
                />
              </svg>
            }
            onClick={handleImgUpload}
          />
        </div>

        <input
          type="text"
          placeholder="Type a message"
          className="bg-[#2c3943] rounded-lg outline-none text-sm text-neutral-200 w-full h-full px-3 placeholder:text-sm placeholder:text-[#8796a1] my-3"
          onChange={handleInputChange}
          ref={inputRef}
        />

        <span className="ml-2">
          {typing ? (
            <RoundedBtn icon={<MdSend />} onClick={handleInputSubmit} />
          ) : (
            <RoundedBtn icon={<BsFillMicFill />} />
          )}
        </span>
      </div>
    </div>
  );
}

export default ChatDetail;
