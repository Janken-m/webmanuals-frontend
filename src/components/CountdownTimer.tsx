import axios from "axios";
import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useUpdateExpairMutation } from "../store/Api";

interface Props {
  duration: string;
  id: string;
}

const CountdownTimer: React.FC<Props> = ({ duration, id }) => {
  const durationCount = parseInt(duration);
  const [updateExpair, { error: errors }] = useUpdateExpairMutation();
  const [time, setTime] = useState<number>(durationCount);

  useEffect(() => {
    let count = setTimeout(() => {
      setTime(time - 1000);
    }, 1000);
    if (time === 0) {
      return () => clearInterval(count);
    }
  }, [time]);

  useEffect(() => {
    const ChangeExpair = (id: string) => {
      if (time === 0) {
        const body = {
          expair: time,
          id: id,
        };
        try {
          updateExpair(body);
        } catch (error) {
          if (errors) {
            //@ts-ignore
            toast.error(`${errors.data.error}`);
          }
          console.log(error);
        }
      }
    };
    ChangeExpair(id);
  }, [time]);

  const getFormattedTime = (millisecounds: number) => {
    let total_secounds = Math.floor(millisecounds / 1000);

    let total_minutes = Math.floor(total_secounds / 60);

    let seconds = total_secounds % 60;

    let minutes = total_minutes % 60;

    return `${minutes} : ${seconds}`;
  };

  return (
    <div style={{ color: "black" }}>
      {time <= 0 ? (
        <p style={{ color: "red", fontWeight: "bold" }}>Invalid URL</p>
      ) : (
        getFormattedTime(time)
      )}
    </div>
  );
};

export default CountdownTimer;
