import { useState } from "react";
import { useNavigate } from "react-router";
import "../asset/styles/nav.css"

const Navbar = () => {
    const [quantity, setQuantity] = useState(getQuantity());
    const navigate = useNavigate();

    function getQuantity() {
        const cart = localStorage.getItem("cart");
        return cart ? true : false
    }

    window.addEventListener('storage', () => {
        setQuantity(getQuantity());
    })

    window.addEventListener('hint', () => {
        document.querySelector('.nav-item-hint').style.display = "block";
        setTimeout(() =>{ 
            document.querySelector('.nav-item-hint').style.display = "none"; 
        }, 10000);
    })

return (
    <nav>
        <div className="navbar">
            <div className="nav-item"
                onClick={() => navigate('/')}>
                <div className="nav-item-menu"></div>
                <label>訂購</label>
            </div>
            <div className="nav-item nav-cart"
                onClick={() => navigate('/cart')}>
                <div className="nav-item-cart"></div>
                {quantity ? (<div className="nav-cart-hint"> </div>) : ('')}
                <label>購物車</label>
            </div>
            <div className="nav-item">
                <div className="nav-item-order"
                    onClick={() => navigate('/order')}></div>
                <label>訂單</label>
            </div>
            <div className="nav-item">
                <div className="nav-item-profile"></div>
                <label>會員</label>
            </div>
            <div className="nav-item-hint icon"></div>
        </div>
    </nav>
)
}

export default Navbar