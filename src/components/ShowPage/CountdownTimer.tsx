import { useEffect, useState } from "react"
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { useOutletContext } from "react-router-dom";
import Context from "../../models/Context.model";
import { CircularProgressbarStyles } from "react-circular-progressbar/dist/types";
import strings from "../../utilities/strings";

export default function CountdownTimer(props: { date: string | undefined }) {

    const [countdown, setCountdown] = useState<{
        days: number,
        hours: number,
        minutes: number,
        seconds: number
    }>({
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0
    })

    const { darkMode } = useOutletContext<Context>()
   
      function countTime() {

        const structure: {
            days: number,
            hours: number,
            minutes: number,
            seconds: number
        } = {
            days: 86400,
            hours: 3600,
            minutes: 60,
            seconds: 1
          };
    

        let delta = Math.abs(new Date(props.date || "").getTime() - new Date().getTime()) / 1000

        let res: {
            days: number,
            hours: number,
            minutes: number,
            seconds: number
        } = {
            days: 0,
            hours: 0,
            minutes: 0,
            seconds: 0
        };

        for(let key in structure) {
            res[key as keyof typeof res] = Math.floor(delta / structure[key as keyof typeof res]);
            delta -= res[key as keyof typeof res] * structure[key as keyof typeof res];
        }

        setCountdown(res)

        setTimeout(() => {
            countTime()
        }, 1000);
    } 

    useEffect(() => {
        countTime()
    }, [])
    
    const circularStyles: CircularProgressbarStyles = {
        path: {
            height: 80,
            width: 80,
            stroke: darkMode ? "#00bfb2" : "#294643"
        },
        trail: {
            stroke: darkMode ? "#191716" : "#ebebeb"
        },
        text: {
            fill: darkMode ? "#00bfb2" : "#294643",
            fontSize: "30px",
        },
        background: {
            fill: darkMode ? "#191716" : "#ebebeb"
        }
    }

    return <div className="grid grid-cols-2 grid-rows-2 content-center justify-items-center gap-5 sm:flex lg:gap-12 justify-evenly mt-2">
        <div className="flex flex-col items-center w-24">
            <CircularProgressbar background styles={circularStyles} value={countdown.days} maxValue={7} text={`${countdown.days}`} />
            <span className="text-center text-lg mt-2 dark:text-white">
                {strings.showPage.countdownTimer.days}
            </span>
        </div>
        <div className="flex flex-col items-center w-24">
            <CircularProgressbar background styles={circularStyles} value={countdown.hours} maxValue={24} text={`${countdown.hours}`} />
            <span className="text-center text-lg mt-2 dark:text-white">
                {strings.showPage.countdownTimer.hours}
            </span>
        </div>
        <div className="flex flex-col items-center w-24">
            <CircularProgressbar background styles={circularStyles} value={countdown.minutes} maxValue={60} text={`${countdown.minutes}`} />
            <span className="text-center text-lg mt-2 dark:text-white">
                {strings.showPage.countdownTimer.minutes}
            </span>
        </div>
        <div className="flex flex-col items-center w-24">
            <CircularProgressbar background styles={circularStyles} value={countdown.seconds} maxValue={60} text={`${countdown.seconds}`} />
            <span className="text-center text-lg mt-2 dark:text-white">
                {strings.showPage.countdownTimer.seconds}
            </span>
        </div>
    </div>
}
