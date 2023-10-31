import { useOutletContext } from "react-router-dom";
import Context from "../../models/Context.model";
import strings from "../../utilities/strings";
import { useEffect, useRef, useState } from "react";
import generateRandomString from "../../utilities/randomString";
import PopUpMessage from "../../models/PopUpMessage.model";

export default function UserDataDisplay() {

  const [showEditForm, setShowEditForm] = useState<boolean>(false);

  const { userData, socket } = useOutletContext<Context>();

  const [newNick, setNewNick] = useState<string>(userData.userNick);

  const [buttonsDisable, setButtonsDisable] = useState<string>("");

  const buttonDisableRef = useRef<string>("");

  function submitEditProfile() {
      if (newNick === userData.userNick) {
        setShowEditForm(false)
      } else {
        const eventID = `edit-profile-${generateRandomString(48)}`;
        socket.emit("editProfile", { newNick: newNick, eventID: eventID })
        setButtonsDisable(eventID)
      }
  }

  useEffect(() => {
    if (socket) {
      socket.on("emitPopUpNotification", (data: PopUpMessage) => {
        if (data.eventID === buttonDisableRef.current) setButtonsDisable("")
        if (data.message === "profileEdited") setShowEditForm(false)
      })
    }
  }, [socket])
  
  useEffect(() => {
    buttonDisableRef.current = buttonsDisable
  }, [buttonsDisable])

  return (
    <div>
      {showEditForm ? (
        <>
          <input className="text-input w-1/2 lg:w-1/4" type="text" value={newNick} onChange={(e) => setNewNick(e.target.value.trim())} placeholder={strings.registerPage.form.passNick} />
          <div className="flex justify-evenly w-1/2 lg:w-1/4 mt-5">
            <button className="bg-green-700 disabled:bg-gray-700 rounded-lg w-10 h-10 flex items-center justify-center mb-4 hover:bg-green-900 transition-all duration-200 ease-in-out"
            disabled={!newNick || buttonsDisable != ""}
            onClick={submitEditProfile}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4.5 12.75l6 6 9-13.5"
                />
              </svg>
            </button>
            <button onClick={() => setShowEditForm(false)}
            disabled={buttonsDisable != ""}
            className="bg-red-700 disabled:bg-gray-700 rounded-lg w-10 h-10 flex items-center justify-center hover:bg-red-900 transition-all duration-200 ease-in-out">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-8 h-8 stroke-white"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </>
      ) : (
        <>
          <button className="bg-gray-100 hover:bg-gray-500 p-2 rounded-xl mb-3 transition-all duration-200 ease-in-out"
          onClick={() => setShowEditForm(true)}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-8 h-8"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125"
              />
            </svg>
          </button>
          <p className="mb-3">
            <span className="profile-data-category">Nick: </span>
            <span className="profile-data-value">{userData.userNick}</span>
          </p>
          <p className="mb-3">
            <span className="profile-data-category">Email: </span>
            <span className="profile-data-value">{userData.userEmail}</span>
          </p>
          <p className="mb-3">
            <span className="profile-data-category">
              {strings.profilePage.userCreateDate}{" "}
            </span>
            <span className="profile-data-value">
              {new Date(userData.userCreateDate).toLocaleString().split(",")[0]}
            </span>
          </p>
        </>
      )}
    </div>
  );
}
