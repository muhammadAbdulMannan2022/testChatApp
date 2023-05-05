import React, { createContext, useContext, useEffect, useState } from "react";
import {
  getDatabase,
  onValue,
  ref,
  set,
  get,
  child,
  update,
} from "firebase/database";
import app from "../../firebase/firebase.config";
import { AuthContext } from "./AuthProvider";
export const DbContext = createContext(null);
const db = getDatabase(app);
const Functions = ({ children }) => {
  const [users, setUsers] = useState(null);
  const [massageOfUser, setMassageOfUser] = useState([]);
  // write user data
  const whiteUserDataInDb = (userId, name, email, imageUrl) => {
    set(ref(db, "users/" + userId), {
      username: name,
      email: email,
      profile_picture: imageUrl,
    });
  };
  // write massage data
  const whiteMassageDataInDb = (currentUserId, reciverId) => {
    get(child(ref(db), `massages/${currentUserId + reciverId}/massage`))
      .then((snapshot) => {
        console.log(snapshot.val());
        if (!snapshot.val()) {
          console.log(snapshot.val());
          get(child(ref(db), `massages/${reciverId + currentUserId}`)).then(
            (snap1) => {
              console.log(snap1.val());
              if (!snap1.val()) {
                console.log(snap1.val(), "expected null");
                set(ref(db, `massages/${currentUserId + reciverId}`), {
                  massage: { msg: [{ [currentUserId]: "" }] },
                });
                console.log(currentUserId + reciverId);
              } else {
                get(
                  child(
                    ref(db),
                    `massages/${reciverId + currentUserId}/massage`
                  )
                ).then((snap) => {
                  console.log(snap.val(), "expected massage");
                  setMassageOfUser(snap.val());
                  console.log(massageOfUser, "expected mssage");
                });
              }
              console.log();
              setMassageOfUser(snap1.val());
            }
          );
        } else {
          get(
            child(ref(db), `massages/${currentUserId + reciverId}/massage`)
          ).then((snap) => {
            console.log(snap.val());
            setMassageOfUser(snap.val());
          });
        }
      })
      .catch((err) => console.log(err));
  };
  // update massage
  // send massage
  const sendMassage = (currentUserId, reciverId, massage) => {
    // set(ref(db, `massages/${currentUserId + reciverId}/massage`), {
    //   msg: { [currentUserId]: massage },
    // });
    get(child(ref(db), `massages/${currentUserId + reciverId}/massage`)).then(
      (snapshot) => {
        if (!snapshot.val()) {
          console.log(snapshot.val(), "no");
          get(
            child(ref(db), `massages/${reciverId + currentUserId}/massage`)
          ).then((snap1) => {
            console.log(snap1.val());
            if (!snap1.val()) {
              console.log(snap1.val(), "expected null");
              // set(ref(db, `massages/${currentUserId + reciverId}`), {
              //   massage: { msg: { [currentUserId]: "" } },
              // });
              // console.log(currentUserId + reciverId);
              console.log("not found");
            } else {
              console.log(snap1.val());
              update(ref(db, `massages/${reciverId + currentUserId}/massage`), {
                msg: [...snap1.val()?.msg, { [currentUserId]: massage }],
              })
                .then(() => {
                  console.log("update success");
                  console.log(...snap1.val()?.msg);
                  listenToRealtimeDB(
                    `massages/${reciverId + currentUserId}/massage`,
                    (e) => {
                      console.log(e);
                      setMassageOfUser(e);
                    }
                  );
                })
                .catch((err) => console.log(err));
            }
            console.log();
            setMassageOfUser(snap1.val());
          });
        } else {
          const prev = [...snapshot.val()?.msg];
          // console.log(prev);
          update(ref(db, `massages/${currentUserId + reciverId}/massage`), {
            msg: [...snapshot.val()?.msg, { [currentUserId]: massage }],
          })
            .then(() => {
              console.log("update success1");
              console.log(...snapshot.val()?.msg);
              listenToRealtimeDB(
                `massages/${currentUserId + reciverId}/massage`,
                (e) => {
                  console.log(e);
                  setMassageOfUser(e);
                }
              );
            })
            .catch((err) => console.log(err));
        }
      }
    );
  };
  // console.log(massageOfUser);
  // read data
  const readUserData = () => {
    get(child(ref(db), "users")).then((snapshot) => {
      const Array = Object.entries(snapshot.val() || {});
      setUsers(Array);
    });
  };
  // wathcing for new users
  const watchingNewUser = () => {
    const usersDbRef = ref(db, "users");
    onValue(usersDbRef, (snapshot) => {
      const data = snapshot.val();
      const Array = Object.entries(data || {});
      setUsers(Array);
    });
  };
  // watching for update massage
  const listenToRealtimeDB = (path, callback) => {
    const db = getDatabase();
    const dbRef = ref(db, path);
    onValue(dbRef, (snapshot) => {
      const data = snapshot.val();
      callback(data);
    });
  };
  const inFo = {
    users,
    massageOfUser,
    sendMassage,
    readUserData,
    whiteUserDataInDb,
    whiteMassageDataInDb,
    listenToRealtimeDB,
    watchingNewUser,
  };
  useEffect(() => {}, [users]);
  return <DbContext.Provider value={inFo}>{children}</DbContext.Provider>;
};

export default Functions;
