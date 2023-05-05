import React, { useContext, useEffect, useRef, useState } from "react";
import { FaArrowAltCircleRight, FaPlus } from "react-icons/fa";
import { DbContext } from "../../Providers/Functions";
import { AuthContext } from "../../Providers/AuthProvider";

const Home = () => {
  const {
    users,
    sendMassage,
    massageOfUser,
    readUserData,
    whiteMassageDataInDb,
    listenToRealtimeDB,
    watchingNewUser,
  } = useContext(DbContext);
  const [currentReciverId, setCurrentReciverId] = useState(null);
  const [typedMassage, setTypedMassage] = useState("");
  const { user } = useContext(AuthContext);
  const [reciverName, setReciverName] = useState("");
  const [reciverImg, setReciverImg] = useState("");
  const scrolInto = useRef(null);
  useEffect(() => {
    readUserData();
  }, []);
  useEffect(() => {
    watchingNewUser();
  }, []);
  const handleClickOnUser = (id, name, img) => {
    whiteMassageDataInDb(user?.uid, id);
    setCurrentReciverId(id);
    setReciverName(name);
    setReciverImg(img);
  };
  useEffect(() => {
    listenToRealtimeDB("massages", (e) => {
      // console.log(e);
    });
    scrolInto.current.scrollIntoView();
    // console.log(massageOfUser);
  }, [massageOfUser]);
  return (
    <div className="flex flex-col h-full w-full bg-gray-900 text-white">
      <div className="flex-1 flex flex-col overflow-hidden md:flex-row">
        {/* {console.log(users, massageOfUser)} */}
        {/* Left column */}
        <div className="bg-gray-800 md:w-72 h-full">
          <div className="md:h-16 flex items-center justify-between px-1">
            <h1 className="text-3xl">Chats</h1>
            <div className="rounded-full bg-gray-500 p-3 cursor-pointer">
              <FaPlus />
            </div>
          </div>
          <hr
            style={{ width: "90%", height: "2px" }}
            className="bg-gray-500 mx-auto"
          />
          <div className="mt-4 flex flex-col gap-2">
            {users &&
              users.map((userIn) => {
                if (userIn[0] === user.uid) {
                  ("");
                } else {
                  return (
                    <Chats
                      handleClick={handleClickOnUser}
                      id={userIn[0]}
                      key={userIn[0]}
                      name={userIn[1]?.username}
                      imageUrl={userIn[1]?.profile_picture}
                    />
                  );
                }
              })}
          </div>
        </div>
        <div className="flex-1 bg-gray-900 md:flex md:flex-col">
          {/* Header */}
          <div className="bg-gray-800 md:h-16 flex items-center gap-2 px-4">
            <img
              style={{
                width: "40px",
                height: "40px",
                border: "1px solid gray",
              }}
              className="rounded-full overflow-hidden"
              src={reciverImg}
              alt={reciverName}
            />
            <h1 className="text-lg font-bold">{reciverName}</h1>
          </div>
          {/* Chat messages */}
          <div
            style={{ maxHeight: "calc(100vh - 100px)", width: "100%" }}
            className="flex-1 p-4 flex flex-col overflow-y-scroll"
          >
            {/* fix the massage sender */}
            {/* {console.log(massages1)} */}
            {massageOfUser?.msg &&
              massageOfUser?.msg.map((msg, key) => {
                console.log(msg);
                const keys = Object.keys(msg)[0];
                console.log(msg[keys]);
                return (
                  <Massage
                    key={key}
                    massage={msg[keys]}
                    id={keys}
                    currentUserId={user?.uid}
                  />
                );
              })}
            <div ref={scrolInto}></div>
          </div>

          {/* Chat input */}
          <div className=" w-full h-24 flex items-center justify-center ">
            <div
              style={{ height: "50%" }}
              className="w-3/4 rounded-lg bg-gray-800 flex items-center"
            >
              <input
                onChange={(e) => setTypedMassage(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    sendMassage(user?.uid, currentReciverId, typedMassage);
                    setTypedMassage("");
                  }
                }}
                className="bg-transparent px-4 py-2 outline-none border-e-2"
                style={{ width: "90%" }}
                type="text"
                name="massage"
                value={typedMassage}
                placeholder="massage"
              />
              <div
                onClick={() => {
                  console.log(user?.uid, currentReciverId);
                  sendMassage(user?.uid, currentReciverId, typedMassage);
                  setTypedMassage("");
                }}
                style={{ width: "10%" }}
                className="h-full flex items-center justify-center cursor-pointer"
              >
                <FaArrowAltCircleRight
                  style={{ width: "30px", height: "30px" }}
                  className="-rotate-45"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
const Chats = ({ id, name, imageUrl, handleClick }) => {
  return (
    <div
      onClick={() => handleClick(id, name, imageUrl)}
      className="mx-2 px-1 py-2 bg-gray-600 cursor-pointer flex gap-3 rounded"
    >
      <img
        style={{
          width: "40px",
          height: "40px",
          overflow: "hidden",
          border: "1px solid gray",
        }}
        className="rounded-full"
        src={imageUrl}
        alt={name}
      />
      <h1>{name}</h1>
    </div>
  );
};
const Massage = ({ massage, id, currentUserId }) => {
  console.log(id, currentUserId);
  if (id === currentUserId) {
    return (
      <div
        id={id}
        style={{ maxWidth: "80%" }}
        className="bg-gray-500 my-1 self-end inline px-3 rounded-tr-none rounded-lg py-2"
      >
        {massage}
      </div>
    );
  } else {
    return (
      <div
        id={id}
        style={{ maxWidth: "80%" }}
        className="bg-gray-500 my-1 self-start inline px-3 rounded-ss-none rounded-lg py-2"
      >
        {massage}
      </div>
    );
  }
};
export default Home;
