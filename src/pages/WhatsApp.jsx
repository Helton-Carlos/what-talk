import { useState, useEffect } from 'react';
import Filter from '../components/Filter';
import ChatDetail from '../components/ChatDetail';
import LoadingScreen from '../components/LoadingScreen';
import LeftMessage from '../components/LeftMessage';

function WhatsApp() {
  const [progress, setProgress] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const id = setTimeout(() => {
      if (progress >= 100) setLoading(false);
      else {
        const increment = Math.floor(Math.random() * (10 + 1)) + 7;
        setProgress(progress + increment);
      }
    }, 300);

    return () => clearTimeout(id);
  }, [progress]);

  return (
    <>
      {loading ? (
        <LoadingScreen progress={progress} />
      ) : (
        <div className="w-screen h-screen overflow-hidden">
          <div className="bg-[#111a21] h-screen flex justify-start whatsapp-bp:justify-center items-center">
            <LeftMessage />

            <div className="w-full h-full min-w-[340px] max-w-[440px] bg-[#111a21]">
              <Filter />
            </div>

            <div className="w-full h-full min-w-[415px] max-w-[1120px] bg-[#222f35]">
              <ChatDetail />
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default WhatsApp;
