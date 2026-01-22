import { Toaster } from "react-hot-toast";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";

export default function App() {
  return (
    <div>
      {/* Global components */}
      <GlobalNavbar />
      {/* Global Toasts */}
      <Toaster position="bottom-right" reverseOrder={false} />
      {/* main routes */}
      <Container >
        <Routes>
          <Route path='/' Component={Home} />
          <Route path='/login' Component={Login} />        
          </Routes>
      </Container>
      {/* Global components */}
      <Footer />
    </div>
  )
}
