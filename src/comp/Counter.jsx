import React, { useEffect, useState, useRef } from 'react';

export const Counter = ({ timer }) => {
  const [second, setSecond] = useState(0);
  const [min, setMin] = useState(0);
  const [hour, setHour] = useState(0);
  const intervalRef = useRef(null);

  useEffect(() => {
    if (timer) {
      intervalRef.current = setInterval(() => {
        setSecond((prevSecond) => {
          if (prevSecond === 59) {
            setMin((prevMin) => {
              if (prevMin === 59) {
                setHour((prevHour) => prevHour + 1);
                return 0;
              } else {
                return prevMin + 1;
              }
            });
            return 0;
          } else {
            return prevSecond + 1;
          }
        });
      }, 1000);

      return () => clearInterval(intervalRef.current);
    }
  }, [timer]);

  return (
    <div style={{ display: 'flex', justifyContent: 'right', color: 'white', width: '100%' }}>
      <div style={{ borderRadius: '30%', padding: '10px', marginRight: '20px' }}>
        <h4 style={{ textAlign: 'center' }}> Timer :  
           { hour < 10 ? '0' + hour : hour}:{min < 10 ? '0' + min : min}:{second < 10 ? '0' + second : second}
        </h4>
      </div>
    </div>
  );
};
