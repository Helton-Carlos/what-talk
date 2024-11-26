import { useState, useEffect, useRef } from 'react';
import Message from './Message';
import RoundedBtn from './Common/RoundedBtn';
import { messagesData } from '../data/whatsapp';
import { FaRegBuilding, FaHeadphonesAlt } from "react-icons/fa";
import { MdClose } from "react-icons/md";
import { TbArrowsRightLeft, TbLibraryPhoto } from 'react-icons/tb';
import { MdSend } from 'react-icons/md';
import { HiDotsVertical } from 'react-icons/hi';
import { AiOutlineThunderbolt } from 'react-icons/ai';
import { BsFillMicFill } from 'react-icons/bs';
import { IoAddOutline, IoDocumentTextSharp } from 'react-icons/io5';
import { cs1, cs2 } from '../assets/whatsapp';
import { getTime } from '../logic/whatsapp';
import { HiOutlinePhoneXMark } from 'react-icons/hi2';

function ChatDetail() {
  const [messages, setMessages] = useState(messagesData);
  const [typing, setTyping] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const inputRef = useRef(null);
  const bottomRef = useRef(null);

  const [isTransferCall, setIsTransferCall] = useState(false);
  const [isCloseCall, setIsCloseCall] = useState(false);
  const [isUserDots, setIsUserDots] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  
  const transferCall = () => {
    setIsTransferCall(!isTransferCall);
  };
  
  const closeCall = () => {
    setIsCloseCall(!isCloseCall);
  };

  const userDots = () => {
    setIsUserDots(!isUserDots);
  };

  const uploadFile = () => {
    setIsOpen(!isOpen);
  };

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

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value?.toLowerCase());
  };

  const filteredMessages = messages.filter((msg) => 
    msg && msg.msg && typeof msg.msg === 'string' && msg.msg.toLowerCase().includes(searchTerm)
  );  

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
            <h1 className="text-white hover:text-gray-400 font-medium font-custom">Coding Spot</h1>

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
            className="rounded-lg bg-[#111B21] text-white text-sm font-light outline-none px-20 py-3 w-[344px] h-[32px] placeholder:text-[#8796a1] placeholder:text-sm placeholder:font-light"
            placeholder="Search"
            required
            value={searchTerm}  
            onChange={handleSearchChange}
          />
        </div>

        <div className="flex justify-between items-center gap-5">
          <RoundedBtn
            icon={<TbArrowsRightLeft className="text-gray-300 size-5" />}
            onClick={transferCall}
          />

          {isTransferCall && (
            <div 
              className="w-[350px] bg-[#202d33] absolute z-10 top-5 right-10 mt-10 rounded-md text-center shadow-lg focus:outline-none"
              role="menu" 
              aria-orientation="vertical" 
              aria-labelledby="user-menu-button"
              id="dropdown-menu"
            >
              <p className='uppercase text-white py-5 px-4 text-xs font-medium'>
                Transferir chamado
              </p>

              <form className="max-w-sm px-4 mx-auto">
                <label htmlFor="categoria" className="block mb-2 text-sm text-left text-gray-200">Transferir para departamento</label> 
                <div className="relative">
                  <select id="categoria" name="categoria" className="block bg-[#202d33] w-full text-gray-200 pl-10 pr-3 py-1 border  rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500">
                    <option value="arte">Arte</option>
                    <option value="plastica">Plástica</option>
                  </select>

                  <FaRegBuilding className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" /> 
                </div>
       
                <label htmlFor="atendimento" className="block my-2 text-sm text-left text-gray-200">Transferir para atendimento</label> 
                <div className="relative">
                  <select id="atendimento" name="atendimento" className="block bg-[#202d33] w-full text-gray-200 pl-10 pr-3 py-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500">
                    <option value="daniel">Daniel</option>
                    <option value="amanda">Amanda</option>
                  </select>

                  <FaHeadphonesAlt className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" /> 
                </div>

                <label 
                  htmlFor="message" 
                  className="block my-2 text-sm text-left text-gray-200"
                >
                  Adicionar comentário
                </label>
                <textarea 
                  id="message" 
                  rows="4" 
                  className="block bg-[#202d33] w-full text-gray-200 pl-2 py-1 mb-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500" 
                  placeholder="Adicionar comentário" 
                />

                <div className='flex justify-center gap-4 my-4'>
                  <button className='bg-[#747474] text-gray-800 px-4 py-1 rounded-full hover:bg-[#737f85] hover:text-gray-200'>
                    Cancelar
                  </button>

                  <button className='bg-[#dadfe1] text-gray-800 px-4 py-1 rounded-full hover:bg-[#464e52] hover:text-gray-200'>
                    Enviar
                  </button>
                </div>
              </form>
            </div>
          )}

          <RoundedBtn
            icon={<HiOutlinePhoneXMark className="text-red-500 size-5" />}
            onClick={closeCall}
          />

          {isCloseCall && (
            <div 
              className="w-[227px] bg-[#202d33] absolute z-10 top-5 mt-10 rounded-md text-center shadow-lg focus:outline-none"
              role="menu" 
              aria-orientation="vertical" 
              aria-labelledby="user-menu-button"
              id="dropdown-menu"
            >
              <div className="relative top-2 flex justify-end text-white pt-1 pr-4">
                <MdClose className='hover:cursor-pointer' onClick={closeCall} />
              </div>

              <p className='uppercase text-white py-8 px-4 text-xs font-medium'>
                Deseja fechar o chamado
              </p>

              <div className="uppercase font-medium text-center text-xs text-white bg-black py-2 hover:cursor-pointer hover:bg-slate-700" onClick={closeCall}>
                <p>
                  Fechar
                </p>
              </div>
            </div>
          )}
          
          <RoundedBtn 
            icon={<HiDotsVertical />}
            onClick={userDots}
          />

          {isUserDots && (
            <div 
              className="w-[400px] h-screen bg-[#262c2e] text-white absolute z-10 top-0 right-0 rounded-md text-center shadow-lg focus:outline-none"
              role="menu" 
              aria-orientation="vertical" 
              aria-labelledby="user-menu-button"
              id="dropdown-menu"
            >
              <div className="relative my-2 top-2 flex justify-start items-center mt-4 mb-4 gap-2">
                <RoundedBtn 
                  icon={<MdClose className='hover:cursor-pointer' />}
                  onClick={userDots}
                />

                <p className='uppercase text-white text-xs font-medium'>
                  Dados do contato
                </p>
              </div>

              <div className='bg-[#202d33] my-2 py-8 flex justify-center flex-col gap-4'>
                <img
                  src={cs1}
                  alt="profile_picture"
                  className="size-28 mx-auto rounded-full"
                />

                <h1 className="font-medium font-custom">Coding Spot</h1>
                <p className="text-[#8796a1] text-xs font-custom">(55519982985)</p>
              </div>

              <div>
                <h1 className="text-white font-medium font-custom my-2 py-4">CADASTRAR/EDITAR CLIENTE</h1>
              </div>

              <div className='bg-[#202d33] my-2 py-4'>
                <h1 className="text-white font-medium font-custom">ÚLTIMOS PEDIDOS</h1>
                <p>-------------------------------------------</p>

                <div className='flex justify-center items-center gap-4 mt-2'>
                  <span>#1435057</span> <span className='font-bold px-3 py-0.5 rounded-full border-2 border-sky-700'>cancelado</span>
                </div>
              </div>

              <div className='bg-[#202d33] my-2 py-4 px-4'>
                <h1 className="text-white font-medium font-custom text-left mb-4">Tags</h1>
                <div className='p-2 my-2 rounded-sm border border-white'>
                  <span id="badge-dismiss-default" className="inline-flex items-center px-2 py-1 me-2 text-sm font-medium text-gray-800 bg-gray-100 rounded">
                    Juliene
                    <button 
                      type="button" 
                      className="inline-flex items-center p-1 ms-2 text-sm text-gray-400 bg-transparent rounded-sm hover:bg-gray-200 hover:text-gray-900" 
                      data-dismiss-target="#badge-dismiss-default" 
                      aria-label="Remove"
                    >
                      <svg className="w-2 h-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                      <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                      </svg>
                      <span className="sr-only">Remove badge</span>
                    </button>
                  </span>

                  <span id="badge-dismiss-default" className="inline-flex items-center px-2 py-1 me-2 text-sm font-medium text-gray-800 bg-gray-100 rounded">
                    Venda concluída
                    <button 
                      type="button" 
                      className="inline-flex items-center p-1 ms-2 text-sm text-gray-400 bg-transparent rounded-sm hover:bg-gray-200 hover:text-gray-900" 
                      data-dismiss-target="#badge-dismiss-default" 
                      aria-label="Remove"
                    >
                      <svg className="w-2 h-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                      <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                      </svg>
                      <span className="sr-only">Remove badge</span>
                    </button>
                  </span>
                </div>

                <h1 className="text-white font-medium font-custom text-left my-4">Atendente padrão para chamados</h1> 
                <div>
                  <select id="categoria" name="categoria" className="w-full block bg-[#202d33] text-gray-200 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500">
                    <option value="arte">Selecione</option>
                    <option value="plastica">Plástica</option>
                  </select>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <div
        className="bg-[#0a131a] bg-[url('assets/images/bg.webp')] bg-contain overflow-y-scroll h-full"
        style={{ padding: '12px 7%' }}
      >
        {filteredMessages.map((msg, index) => (
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
          <RoundedBtn icon={
            <IoAddOutline 
              aria-expanded={isOpen ? "true" : "false"} 
              aria-controls="dropdown-menu"
            />} 

            onClick={uploadFile} 
          />

          {isOpen && (
            <div 
              className="w-[170px] bg-[#202d33] absolute z-10 bottom-5 mb-10 rounded-md py-2 px-2 text-center shadow-lg focus:outline-none"
              role="menu" 
              aria-orientation="vertical" 
              aria-labelledby="user-menu-button"
              id="dropdown-menu"
            >
              <div className="flex items-center justify-center py-2 text-sm text-white hover:bg-black hover:text-gray-400 hover:cursor-pointer hover:rounded-full" role="menuitem" id="user-menu-item-0">
                <IoDocumentTextSharp className="size-7 pr-2 text-[#8C32FF]" /> <span className="font-medium">Documentos</span> 
              </div>

              <div className="flex items-center justify-center py-2 text-sm text-white  hover:bg-black hover:text-gray-400 hover:cursor-pointer hover:rounded-full" role="menuitem" id="user-menu-item-1">
                <TbLibraryPhoto className="size-7 pr-2 text-[#007BFC]" /> <span className="font-medium"> Fotos e vídeo</span>
              </div>
            </div>
          )}

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

        <span className="mx-2">
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
