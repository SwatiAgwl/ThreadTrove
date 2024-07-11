// import logo from './logo.svg';
import './App.css';
import { Route,Routes } from 'react-router-dom';
import { HomePage } from './pages/HomePage';
import { LoginPage } from './pages/authPages/LoginPage';
import { SignupPage } from './pages/authPages/SignupPage';
import { Navbar } from './components/Navbar';
import { VerifyEmail } from './pages/authPages/VerifyEmail';
import { ResetPassword } from './pages/authPages/ResetPassword';
import { UpdatePassword } from './pages/authPages/UpdatePassword';
import { About } from './pages/About';
import { Contact } from './pages/Contact';
import { EditProfile } from './pages/customerPages/EditProfile';
import { PrivateRoute } from './components/PrivateRoute';
import { ErrorPage } from './pages/ErrorPage';
import { BagPage } from './pages/customerPages/BagPage';
import { useSelector } from 'react-redux';
import { OrdersPage } from './pages/customerPages/OrdersPage';
import { WishlistPage } from './pages/customerPages/WishlistPage';
import { CreateProduct } from './pages/adminPages/CreateProduct';
import { CategoryPage } from './pages/CategoryPage';
import { ProductPage } from './pages/ProductPage';
import { CreateCategory } from './pages/adminPages/CreateCategory';
import { AdminSidebar } from './components/AdminSidebar';
import { Dashboard } from './pages/adminPages/Dashboard';
import { Navigate } from 'react-router-dom';
import { fetchCategories } from './services/operations/productapi';
import { DotLoader } from 'react-spinners';
import { useState,useEffect } from 'react';

function App() {
    const {user}= useSelector((state)=> state.user);
    const [loading, setLoading] = useState(true);
    const [categories, setCategories] = useState([]);

  useEffect(() => {
    const getCategories = async () => {
      const categories = await fetchCategories();
      setCategories(categories);
      setLoading(false);
    };
    getCategories();
  }, []);

  if (loading) {
    return <div className='w-full h-screen flex justify-center items-center'><DotLoader color="#f97ca3" /> </div>;
  }

  return (
    <div className="App">
      <Navbar categories={categories}/>
      <Routes>
        <Route path='/' element={<HomePage/>} ></Route>
        <Route path='/login' element={<LoginPage/>} ></Route>
        <Route path='/signup' element={<SignupPage/>} ></Route>
        <Route path='/verify-email' element={<VerifyEmail/>} ></Route>
        <Route path='/reset-password' element={<ResetPassword/>} ></Route>
        <Route path='/update-password/:id' element={<UpdatePassword/>} ></Route>
        <Route path='/about' element={<About/>} ></Route>
        <Route path='/contact' element={<Contact/>} ></Route>


        <Route path='/category/:categoryName' element={<CategoryPage/>} ></Route>
        <Route path='/product/:product_id' element={<ProductPage/>} ></Route>



        {/* <Route>
        <PrivateRoute>
          <Route path='/edit-profile' element={<EditProfile/>} ></Route>
        </PrivateRoute>
        </Route> */}
        <Route
          path="/edit-profile"
          element={
            <PrivateRoute>
              <EditProfile />
            </PrivateRoute>
          }
        />

        {
          user?.isAdmin=== false && (
            <>
              <Route path='/bag' element={<BagPage/>} />
              <Route path='/orders' element={<OrdersPage/>} />
              <Route path='/wishlist' element={<WishlistPage/>} />
            </>
          )
        }
        {
          user?.isAdmin=== true && (
            <>
   
            <Route path='/admin' element={<AdminSidebar/>}>
            
              <Route path='dashboard' element={<Dashboard/>}></Route>
              <Route path='create-product' element={<CreateProduct/>}/>
              <Route path='create-category' element={<CreateCategory/>}/>
            </Route>
            </>
            
          )
        }

        <Route path='*' element= {<ErrorPage/>} ></Route>
        

      </Routes>
    </div>
  );
}

export default App;
