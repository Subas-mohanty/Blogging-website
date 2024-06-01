import { useEffect, useState } from "react";
import "./App.css";
import { useDispatch } from "react-redux";
import authService from "./appwrite/auth";
import { login, logout } from "./store/authSlice";
import Loading from "./components/Loading";
import { Footer, Header } from "./components";
import { Outlet } from "react-router-dom";

function App() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    // get loggedin status
    authService
      .getCurrent()
      .then((userData) => {
        if (userData) {
          dispatch(login({ userData }));
        } else {
          dispatch(logout());
        }
      })
      .finally(()=>{setLoading(false)});
    
  }, []);
  
  if(loading) return <Loading/>;
  return <div className="min-h-screen flex flex-wrap content-between bg-gray-400">
    <div className="w-full block">
      <Header/>
      <main>
        {/* // TODO: <Outlet/> */}

        <h1>Hello form subu</h1>
      </main>
      <Footer/>
    </div>
  </div>
}

export default App;
