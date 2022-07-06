import './App.scss';
import { Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import StudentNote from './components/StudentNote';
import UserList from './components/UserList';
import Navbar from './components/Navbar';

function App() {
  return (
    <>
    <Routes>
      <Route index element = {<Login />} />
      <Route path='studentNote' element = {<StudentNote />} />
      <Route path='userList' element = {<UserList />} />
      <Route path='navbar' element = {<Navbar />} />


      
    </Routes>
    
    </>
  );
}

export default App;
