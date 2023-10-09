import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Route, Routes } from "react-router-dom";
import Home from "./pages/user/Home";
import AddForm from "./components/user/Addform";
import EditForm from './components/user/EditForm';
import ErrorPage from './pages/user/404';
import StudentView from './pages/user/StudentView';


function App() {

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/add" element={<AddForm />} />
        <Route path="/edit/:id" element={<EditForm />} />
        <Route path="/view/:id" element={<StudentView />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
      <ToastContainer position='bottom-right' autoClose={3000}></ToastContainer>
    </div>
  );
}

export default App;
