function Chat({ pp, contact, msg, time, unreadMsgs, active }) {
  return (
    <div
      className={`flex justify-between items-center cursor-pointer w-full h-[85px] px-3 hover:bg-[#202d33] ${
        active ? 'bg-[#202d33]' : ''
      }`}
    >
      <img
        src={pp}
        alt="profile_picture"
        className="rounded-full w-[50px] mr-5"
      />

      <div className="flex justify-between border-t border-neutral-700 w-full h-full py-3">
        <div className="flex flex-col justify-between text-white">
          <h1 className="font-medium mb-1">{contact}</h1>

          <p className={`text-sm ${!unreadMsgs ? 'text-neutral-400' : ''}`}>
            {msg}
          </p>
        </div>

        <div className="flex flex-col justify-between items-end h-full text-xs">
          <p className="text-emerald-500 min-w-[55px]">{time}</p>

          {unreadMsgs && (
            <div className="flex justify-center items-center bg-emerald-500 rounded-full w-[20px] h-[20px]">
              <p className="text-emerald-900">{unreadMsgs}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Chat;
