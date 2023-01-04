import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Home from './pages/Home';
import Navbar from './components/Navbar';
import MenuItem from './pages/MenuItem';
import Cart from './pages/Cart'
import Order from './pages/Order'

const App = () => {
    return (
        <BrowserRouter>
            <ToastContainer />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/item" element={<MenuItem />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/order" element={<Order />} />
            </Routes>
            <Navbar />
        </BrowserRouter>
    )
}

export default App