import './App.css';
import { Route, Routes } from 'react-router-dom';
import Home from './Pages/Home';
import Queries from './Pages/Queries';
import ErrorPage from './Pages/404';
import Answer from './Pages/Answer';
import Admin from './Pages/AdminPage';
import useGlobalContext from './hooks/useGlobalContext';
import { useEffect, useState } from 'react';
import Profile from './Pages/Profile';
import Query from './Pages/Queries';
import AskQuestion from './Pages/AskQuestion';

function App() {


  const { walletAddress } = useGlobalContext();
  const address = ["tz1hxTwWPfqAAmqp9RiXoWBi1pTLteHD6eaN", "tz1gXMkrmVXQGyHcVmEfWUMPtuJtASRKwddY"];

  const [isAdmin, setisAdmin] = useState(false);

  useEffect(() => {
    if (address.includes(walletAddress)) {
      setisAdmin(true);
    }
  }, [walletAddress]);

  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/profile" element={walletAddress ? <Profile /> : <Home />} />
        <Route path="/query" element={walletAddress ? <Query /> : <Home />} />
        <Route path="/answer/:id" element={walletAddress ? <Answer /> : <Home />} />
        <Route path="/admin" element={walletAddress ? (isAdmin ? <Admin /> : <Home />) : <Home />} />
        <Route path="/askQuestion" element={walletAddress ? <AskQuestion /> : <Home />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </>
  );
}

export default App;
