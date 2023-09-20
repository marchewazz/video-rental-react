import { useOutletContext } from "react-router-dom";
import strings from "../utilities/strings";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import Context from "../models/Context.model";
import generateRandomString from "../utilities/randomString";
import PopUpMessage from "../models/PopUpMessage.model";

export default function AddMoneyPage() {

  const [disableAddMoneyButton, setDisableAddMoneyButton] = useState<string>("");
  const disableAddMoneyButtonRef = useRef<string>(disableAddMoneyButton);

  const [inputMoney, setInputMoney] = useState<string>("0");

  const { socket, userData, userDataReady } = useOutletContext<Context>();

  function formatInput(event: ChangeEvent<HTMLInputElement>): void {
    const allowedChars: string[] = [
      "0",
      "1",
      "2",
      "3",
      "4",
      "5",
      "6",
      "7",
      "8",
      "9",
      ".",
    ];
    let tempInputMoney: string = event.target.value;

    if (tempInputMoney.length) {
      for (let i = 0; i < tempInputMoney.length; i++) {
        if (!allowedChars.includes(tempInputMoney[i])) {
          tempInputMoney = tempInputMoney.replace(
            /./g,
            (char: any, index: any) => (index == i ? "" : char)
          );
        }
      }
      if (tempInputMoney.includes(".")) {
        if (tempInputMoney.startsWith(".")) {
          tempInputMoney = "0" + tempInputMoney;
        }
        if ((tempInputMoney.match(/\./g) || []).length >= 2) {
          let occurances = 0;
          tempInputMoney = tempInputMoney.replace(/\./g, (matchedChar: any) =>
            ++occurances >= 2 ? "" : matchedChar
          );
        }
        if (tempInputMoney.split(".")[1].length > 2) {
          tempInputMoney =
            tempInputMoney.split(".")[0] +
            "." +
            tempInputMoney.split(".")[1].slice(0, 2);
        }
      }
      if (
        tempInputMoney.length >= 2 &&
        tempInputMoney.startsWith("0") &&
        tempInputMoney[1] !== "."
      ) {
        tempInputMoney = tempInputMoney.substring(1);
      }
    } else {
      tempInputMoney = "0";
    }
    setInputMoney(tempInputMoney);
  }

  function addMoney(): void {
    const eventID = `add-money-${generateRandomString(48)}`
    setDisableAddMoneyButton(eventID)
    socket.emit("addMoney", { money: inputMoney, eventID: eventID });
  }

  useEffect(() => {
    if (socket) {
      socket.on("emitPopUpNotification", (data: PopUpMessage) => {
        if (data.eventID === disableAddMoneyButtonRef.current) setDisableAddMoneyButton("")
      })
    }
}, [socket])

  useEffect(() => {
    disableAddMoneyButtonRef.current = disableAddMoneyButton
  }, [disableAddMoneyButton])
  

  return (
    <main>
      {userDataReady ? (
        <>
          <p>{strings.addMoneyPage.title}</p>
          <p>
            {strings.formatString(strings.addMoneyPage.balanceInfo, {
              balance: userData.userBalance,
            })}
          </p>
          <input type="text" onChange={formatInput} value={inputMoney} />
          <button disabled={Number(inputMoney) == 0 || disableAddMoneyButton != ""} onClick={addMoney}>
            {strings.addMoneyPage.buttonText}
          </button>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </main>
  );
}
