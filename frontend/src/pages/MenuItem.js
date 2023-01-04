import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import "../asset/styles/item.css"

const MenuItem = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [quantity, setQuantity] = useState(1);
    const [option, setOption] = useState("");
    const [cart, setCart] = useState(localStorage.getItem("cart") ? JSON.parse(localStorage.getItem("cart")) : []);
    const item = location.state.data;
    const options = ["醬油膏", "胡椒鹽"];

    function plus() {
        setQuantity(prev => prev + 1);
    }

    function minus() {
        setQuantity(prev => prev === 1 ? prev : prev - 1);
    }

    function addToCart() {
        if(option === ""){
            return toast.warning("請選擇配料!", { position: "top-center" });
        }
        const newItem = {
            id: item.id,
            name: item.name,
            price: item.price,
            quantity: quantity,
            option: option
        }
        let cartCopy = [...cart];
        let existingItem = cartCopy.find(cartItem => cartItem.id === item.id && cartItem.option === option);
            existingItem ? existingItem.quantity += newItem.quantity: cartCopy.push(newItem);
        
        setCart(cartCopy);
        localStorage.setItem("cart", JSON.stringify(cartCopy));
        window.dispatchEvent(new Event("storage"));
        toast.success("已加入購物車!", { position: "top-center" });
        navigate('/');
    }

    return (
        <div className="item">
            <div className="item-header">
                <img className="item-header-img" src={item.img}/>
                <div className="item-btn-close icon" onClick={() => navigate('/')}></div>
            </div>
            <div className="item-title">{item.name}</div>
            <div className="item-description">
                週間人氣最高的早餐選項！<br />
                內容物：豬肉、高麗菜、餅皮、紅茶、奶精
            </div>
            <div className="item-option">
                <label>配料選項 :</label>
                <div className="item-sauces">
                    {options.map(sauce => {
                        return (
                            <label key={sauce} className="sauce-group">
                                <input
                                    type="radio"
                                    onChange={() => setOption(sauce)}
                                    checked={sauce === option}
                                />
                                <span className="item-sauce">{sauce}</span>
                            </label>
                        )
                    })}
                </div>
            </div>
            <div className="item-footer">
                <div className="item-footer-left">
                    <div className="item-price">
                        <label>總金額 :</label>
                        <span>{item.price * quantity}元</span>
                    </div>
                    <div className="item-count">
                        <div className="item-count-minus icon" onClick={minus}></div>
                        <span>{quantity}</span>
                        <div className="item-count-plus icon" onClick={plus}></div>
                    </div>
                </div>
                <div className="item-btn-add" onClick={addToCart}>加入購物車</div>
            </div>
        </div>
    )
}

export default MenuItem