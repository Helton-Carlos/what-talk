import { FaArrowRightLong } from 'react-icons/fa6';
import imageMessage from '../assets/images/chat14.png';
import RoundedBtn from './Common/RoundedBtn';

function LeftMessage() {
  return (
    <div className="min-w-[62px] h-full bg-[#3984F3] flex flex-col justify-between items-center py-[20px]">
      <img className="size-[40px]" src={imageMessage} alt="img_message" />

      <RoundedBtn
        icon={<FaArrowRightLong className="text-white size-[25px]" />}
      />
    </div>
  );
}

export default LeftMessage;
