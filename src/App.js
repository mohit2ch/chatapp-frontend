
import './App.css';
import { Route, Routes, Navigate } from 'react-router-dom';
import ChatPage from './pages/ChatPage';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import { useChatContext } from './context/ChatContext';


function App() {
  const {user} = useChatContext();
  return (
    <div className="App h-screen w-screen flex justify-center items-center text-black bg-white">
        <Routes>
        <Route path='/chat' element={user? <ChatPage/>:<Navigate to={'/'}/>}/>
        <Route path='/login' element={user? <Navigate to={'/chat'}/>:<LoginPage/>}/>
        <Route path='/signup' element={user? <Navigate to={'/chat'}/>:<SignupPage/>}/>
        <Route path='/' element={user? <Navigate to={'/chat'}/>:<Navigate to={'/login'}/>}/>
        </Routes>
    </div>
  );
}

export default App;
