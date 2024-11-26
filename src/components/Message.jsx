function Message({ msg, time, isLink, img, sent }) {
  return (
    <div
      className={`flex justify-center items-center rounded-md w-fit my-1 ${
        sent ? "bg-[#005c4b] ml-auto" : "bg-[#202d33] mr-auto"
      }`}
    >
      {img ? (
        <div className="relative w-full p-2">
          <img
            src={img}
            alt="img_message"
            className="rounded-md max-w-[270px] w-full"
          />
          <p className="absolute right-2 bottom-3 text-[#8796a1] text-[10px] min-w-[50px]">
            {time}
          </p>
        </div>
      ) : (
        <div
          className="flex justify-between items-end max-w-[410px] p-2"
          style={{ wordBreak: "break-word" }}
        >
          {isLink ? (
            <a
              href={msg}
              target="blank"
              className="text-[#53beec] hover:text-[#53beec] focus:text-[#53beec] active:text-[#53beec] text-sm underline hover:underline mr-2"
            >
              {msg}
            </a>
          ) : (
            <p className="text-white text-sm mr-2">{msg}</p>
          )}
          <p className="text-[#8796a1] text-[10px] min-w-[50px]">{time}</p>
        </div>
      )}
    </div>
  );
}

export default Message;
