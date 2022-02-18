import React, { useEffect, useState } from "react";
import { Link, useParams, Outlet } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../../firebase";
import { doc, getDoc } from "firebase/firestore"
import './index.css';
import HomeBody from './home-body'
import ItemPage from './item-page'

function Home() {
  const { itemId } = useParams()
  console.log(`zzzprop2s`, itemId)
  const [user, loading, error] = useAuthState(auth)
  const [items, setItems] = useState([])

  useEffect(() => {
    if (loading) return
    fetchDb()
  }, [user, loading])

  const fetchDb = async () => {
    try {
      const userRef = doc(db, 'zyE4W5W99qghiU96WPQN0AWUvPr1', 'items')
      const snap = await getDoc(userRef)
      if(snap.exists()) {
        console.log(`zzzexists`, snap.data())
        const items = (snap.data() || {items:[]}).items || []
        setItems(items)
      }
      else {
        console.log(`zzznodata`)
      }
    }  catch (err) {
      console.error(err);
      alert("An error occured while fetching the database");
    }
  }
  
  return (
    <>
      Home<br/>
      <Link to="/dashboard">admin</Link>
      <HomeBody items={items} />
      {
        itemId &&
        <ItemPage items = {items} itemId={itemId} />
      }
    </>
  );
}

export default Home;
