import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate, Link } from "react-router-dom";
import "./index.css";
import { auth, db, logout, admins } from "../../firebase";
import { query, collection, getDocs, where, doc, getDoc, setDoc } from "firebase/firestore";
import Form from './form.js'

function Dashboard() {
  const [user, loading, error] = useAuthState(auth)
  const [items, setItems] = useState([])
  const [shouldUpdate, setShouldUpdate] = useState(false)
  const navigate = useNavigate()

  const manageSignIn = async () => {
    try {
      const q = query(collection(db, "users"), where("uid", "==", user?.uid));
      const res = await getDocs(q);
      console.log(`zzz`, res, res.docs[0].data())
      const data = res.docs[0].data()
      //if not an admin, redirect
      console.log(`zzz`, admins, data?.email, !admins.includes(data?.email))
      if(!admins.includes(data?.email)) {
        navigate("/login");
      }
     await manageDb('fetch')
    } catch (err) {
      console.error(err);
      alert("An error occured while fetching user data");
    }
  };

  useEffect(() => {
    if (loading) return
    if (!user) return navigate("/login")
    manageSignIn();
  }, [user, loading])

  useEffect(() => {
    if(shouldUpdate) {
      manageDb('update')
      console.log(`zzzwillupdate`, items)
    }
  }, [shouldUpdate])

  const updateState = (action, data) => {
    switch(action) {
      case 'add': {
        const newId = items.length>0 ? items[items.length-1].id+1 : 0
        setItems([...items, {...data, id: newId}])
        setShouldUpdate(true)
        break
      }
      default: return
    }
  }

  const manageDb = async (action, data) => {
    try {
      //fetch items in the user's collection
      const userRef = doc(db, user?.uid, 'items')
      
      //
      switch(action) {
        case 'fetch': {
          const snap = await getDoc(userRef)
          if(snap.exists()) {
            console.log(`zzzexists`, snap.data())
            const items = (snap.data() || {items:[]}).items || []
            setItems(items)
          }
          else {
            console.log(`zzznodata`)
          }
          break
        }
        case 'update': {
          await setDoc(userRef, {items: [...items]})
          setShouldUpdate(false)
          break
        }
        default: return
      }
    } catch (err) {
      console.error(err);
      alert("An error occured while updating the database");
    }
  }

  console.log(`zzzitems`, items)

  return (
    <div className="dashboard">
       <div className="dashboard__container">
        Logged in as <div>{user?.email}</div>
         <button className="dashboard__btn" onClick={logout}>
          Logout
         </button>
         <Link to="/">Home</Link>
         <Form
            updateState={updateState}
         />
       </div>
     </div>
  );
}
export default Dashboard