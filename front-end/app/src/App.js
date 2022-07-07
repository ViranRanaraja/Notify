import './App.scss';
import { Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import StudentNote from './components/StudentNote';
import UserList from './components/UserList';
import Navbar from './components/Navbar';
import UpdateUser from './components/UpdateUser';
import CreateUser from './components/CreateUser';

function App() {
  return (
    <>
    <Routes>
      <Route index element = {<Login />} />
      <Route path="/login" element = {<Login />} />
      <Route path='studentNote' element = {<StudentNote />} />
      <Route path='userList' element = {<UserList />} />
      <Route path='navbar' element = {<Navbar />} />
      <Route path='updateuser' element = {<UpdateUser />} />
      <Route path='createuser' element = {<CreateUser />} />

      
    </Routes>
    
    </>
  );
}

export default App;
