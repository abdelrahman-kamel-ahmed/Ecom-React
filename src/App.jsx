import { Toaster } from "react-hot-toast";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import { GlobalNavbar } from "./components/GlobalNavbar/GlobalNavbar";
import { Container } from "react-bootstrap";
import { Route, Routes } from "react-router-dom";
import { Footer } from "./components/Footer/Footer";
export default function App() {
  return (
    <div>
      {/* Global components */}
      <GlobalNavbar />
      {/* Global Toasts */}
      <Toaster position="bottom-right" reverseOrder={false} />
      {/* main routes */}
      <Container className="my-4 min-vh-100">
        <Routes>
          <Route path='/' Component={Home} />
          <Route path='/login' Component={Login} />        
          </Routes>
      </Container>
      {/* Global components */}
      <Footer/>
    </div>
  )
}
