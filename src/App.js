import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Index from './pages';
import About from './pages/about';
import Services from './pages/services';
import Dashboard from './pages/users/Dashboard';
import CustomNavbar from './components/users/CustomNavbar';
import Profile from './pages/users/Profile';
import AboutUser from './pages/users/AboutUser';
import Contact from './pages/contact';
import { ToastContainer } from 'react-toastify';
import Login from './pages/login';
import Register from './pages/register';
import Home from './pages/users/Home';
import UserProvider from './context/user.provider';
import Order from './pages/users/orders';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminHome from './pages/admin/Home';
import AddProduct from './pages/admin/AddProduct';
import AddCategory from './pages/admin/AddCategory';
import ViewCategories from './pages/admin/ViewCategories';
import ViewProducts from './pages/admin/ViewProducts';
import AdminOrders from './pages/admin/AdminOrders';
import AdminUsers from './pages/admin/AdminUsers';
import StorePage from './pages/users/StorePage';
import ProductView from './pages/users/ProductView';
import CategoryStorePage from './pages/users/CategoryStorePage';
import CategoryView from './components/users/CategoryView';
import CartProvider from './context/CartProvider';
import Cart from './pages/users/Cart';

function App() {
  //jsx
  return (


 <UserProvider>
  <CartProvider>

  <BrowserRouter>
  <ToastContainer
  position="bottom-center"
  theme='dark'
  />

  <CustomNavbar/>
  <Routes>
    <Route path='/' element={<Index/>}/>
    <Route path='/about' element={<About/>}/>
    <Route path="/service" element={<Services/>}/>
    <Route path="/cart" element={<Cart/>}/>
    <Route path="/contact" element={<Contact/>}/>
    <Route path="/login" element={<Login/>}/>
    <Route path="/register" element={<Register/>}/>
    <Route path="/store" element={<StorePage/>}/>
    <Route path="store/products/:productId" element={<ProductView/>}/>
    <Route path="store/:categoryId/:categoryTitle" element={<CategoryStorePage/>}/>


    <Route path="/users" element={<Dashboard/>}>
    <Route path='home' element={<Home/>} />
    <Route path='profile/:userId' element={<Profile/>} />
    <Route path='aboutuser' element={<AboutUser/>}/>
    <Route path='orders' element={<Order/>}/>
      </Route>

      <Route path="/admin" element={<AdminDashboard/>}>
        <Route path="home" element={<AdminHome/>}/>
        <Route path="add-product" element={<AddProduct/>} />
        <Route path="add-category" element={<AddCategory/>} />
        <Route path="categories" element={<ViewCategories/>}/>
        <Route path="products" element={<ViewProducts/>}/>
        <Route path="orders" element={<AdminOrders/>}/>
        <Route path="users" element={<AdminUsers/>}/>
      </Route>


  </Routes>
  
  
  </BrowserRouter>
  </CartProvider>
  </UserProvider>   
  );
}

export default App;
