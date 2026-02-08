import { Toaster } from "react-hot-toast";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import { GlobalNavbar } from "./components/GlobalNavbar/GlobalNavbar";
import { Container } from "react-bootstrap";
import { Route, Routes } from "react-router-dom";
import { Footer } from "./components/Footer/Footer";
import { NotFound } from "./pages/NotFound/NotFound";
import { Products } from "./pages/Products/Products";
import { ProductDetails } from "./pages/ProductDetails/ProductDetails";
import { useDispatch, useSelector} from "react-redux";
import { useEffect , useState} from "react";
import { errorHandler } from "./utils/errorHandler";
import { login } from "./store/slicies/userSlices";
import { API } from "./Apis/API_Servece";
import { Loading } from "./components/Loading/Loading";
import { Profile } from "./pages/myProfile/myProfile";
import { Cart } from "./pages/Cart/Cart";
import {ProductsCategory} from "./pages/ProductsCategory/ProductsCategory";
import { DashBoard } from "./pages/DashBoard/Dashboard";
export default function App() {
  //loading
  const [loading,setLoading]=useState(true);
  const {IsLoggedIn,isAdmin} = useSelector(state=>state.user);
  const dispatch=useDispatch();
  useEffect(()=>{
    async function verifyMe(){
      //get token
      const token = getTokenFromLocalStorage();
      //check token
      if(!token){
        setLoading(false);
        return;
      } 
      //send token
      try {
        //enable loading
        setLoading(true);
        //hit api
        const response=await API.get("/auth/me",{
          headers:{
            Authorization:`Bearer ${token}`
          }
        });
        //userData
        const userData=response.data;
        //update redux
        dispatch(login(userData));

      } catch (error) {
        console.log(error);
        errorHandler(error);
        
      } 
      finally{
        //disable loading
        setLoading(false);
      }
    }
    verifyMe();
    function getTokenFromLocalStorage(){
      return JSON.parse(localStorage.getItem('userData'))?.accessToken;
    }
  },[])
  if(loading) return <Loading />;
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
          
          {
            IsLoggedIn ? (
              <>
                {/* profile routes */}
                <Route path="/profile" Component={Profile} />
              </>
            ) : (
              <>
                {/* login routes */}
                <Route path="/login" Component={Login} />
              </>
            )
          }
          {
            isAdmin && IsLoggedIn ? (
              <>
                {/* profile routes */}
              <Route path="/dashboard" Component={DashBoard} />
              </>
            ):(
              <></>
            )
          }
          <Route path="/category/:slug" Component={ProductsCategory } />
          <Route path="/cart" Component={Cart} />
          <Route path='products/*' Component={Products} />
          <Route path="/product-details/:id" Component={ProductDetails} />
          <Route path='*' Component={NotFound} />
          </Routes>
      </Container>
      {/* Global components */}
      <Footer/>
    </div>
  )
}
