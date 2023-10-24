import { useEffect, useState } from "react"

export default function CountdownTimer(props: { date: string | undefined }) {

    const [countdown, setCountdown] = useState<{
        days: number,
        hours: number,
        minutes: number,
        seconds: number
    }>()

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

      function countTime() {
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
    

    return <div className="mt-auto">
        { countdown?.days } { countdown?.hours } { countdown?.minutes} { countdown?.seconds }
    </div>
}
