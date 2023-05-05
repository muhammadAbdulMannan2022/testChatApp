import {
  addDoc,
  collection,
  getFirestore,
  doc,
  getDoc,
} from "firebase/firestore";
import app from "./firebase/firebase.config";

const firestore = getFirestore(app);
// add doc in firestore
const addDocInFireStor = async () => {
  const result = await addDoc(collection(firestore, "users"), {
    name: "muhammad",
    age: 18,
    isMale: true,
  });
  console.log(result);
};
// add sub cullection
const addSubDocInFireStore = async () => {
  const result = await addDoc(
    collection(firestore, "users/pdfD1Q3d7E9KgySNab4o/info"),
    {
      job: ["study", "programing"],
      skills: ["react", "firebase"],
    }
  );
  console.log(result);
};
const readDataFromFirestore = async () => {
  const ref = doc(firestore, "users/pdfD1Q3d7E9KgySNab4o");
  const data = await getDoc(ref);
  console.log(data.data());
};
function App() {
  return <></>;
}

export default App;
