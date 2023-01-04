import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "../asset/styles/cart.css"

const Cart = () => {
    const navigate = useNavigate();
    const [cart, setCart] = useState(localStorage.getItem("cart") ? JSON.parse(localStorage.getItem("cart")) : []);
    const [order, setOrder] = useState(localStorage.getItem("order") ? JSON.parse(localStorage.getItem("order")) : []);
    const [total, setTotal] = useState(getTotal());
    const [wayValue, setWayValue] = useState(0);
    const [submitDisable, setSubmitDisable] = useState(true);
    const ways = [
        { value: 1, option: "預定快取(需登入會員)" },
        { value: 2, option: "現場外帶" },
        { value: 3, option: "現場內用" }
    ];

    function getTotal() {
        let total = 0;
        cart.map(item => {
            total += item.price * item.quantity
        })
        return total;
    }

    function getWay(wayValue) {
        for (let i = 0; i < ways.length; i++) {
            if (ways[i].value === wayValue) {
                return ways[i].option
            }
        }
    }

    useEffect(() => {
        cart.length > 0 ? setSubmitDisable(false) : setSubmitDisable(true);
    }, [])

    function onSubmit() {
        if (wayValue === 0) {
            return toast.warning("請選擇取餐方式!", { position: "top-center" });
        }
        if (wayValue === 1) {
            return toast.warning("請先登入!", { position: "top-center" });
        }
        const orderData = {
            id: 0,
            order: cart,
            total: total,
            dineWays: wayValue
        }

        fetch("http://localhost:8000/api/1.0/orders", {
            headers: new Headers({
                'Content-Type': 'application/json'
            }),
            method: 'POST',
            body: JSON.stringify(orderData),
        }).then((response) => response.json())
            .then(data => {
                orderData.id = data.orderId;
                orderData.dineWays = getWay(orderData.dineWays);

                let orderCopy = [...order];
                orderCopy.push(orderData);
                setOrder(orderCopy);
                localStorage.setItem("order", JSON.stringify(orderCopy));

                localStorage.setItem("cart", []);
                window.dispatchEvent(new Event("storage"));
                window.dispatchEvent(new Event("hint"));
                navigate('/order');
            })
    }

    return (
        <div className="cart">
            <div className="cart-header">
                <label>Cart</label>
                <div className="header-logut"></div>
            </div>
            <div className="cart-items">
                <label className="cart-title">訂購內容 :</label>
                {cart.map((item, idx) => {
                    return (
                        <div key={idx} className="cart-item">
                            <div className="cart-item-title">
                                <span>{item.name}</span>
                                <span className="cart-item-price">${item.price}/ {item.quantity}份</span>
                            </div>
                            <div className="cart-item-option">
                                <span>{item.option}</span>
                                <span>無備註</span>
                            </div>
                        </div>
                    )
                })}
                <div className="cart-item-total">
                    <span>Total:</span>
                    <span className="cart-item-amount">${total}</span>
                </div>
            </div>
            <div className="cart-member">
                <label className="cart-title">會員資訊 :</label>
                <span>無 尚未登入</span>
            </div>
            <div className="cart-ways">
                <label className="cart-title">取餐方式 :</label>
                {ways.map(way => {
                    const { value, option } = way;
                    return (
                        <div key={value} className="cart-way">
                            <input type="radio" value={value}
                                onChange={() => setWayValue(value)}
                                checked={value === wayValue}
                            />
                            <label>{option}</label>
                        </div>
                    )
                })}
            </div>
            <button className="cart-btn-submit" onClick={onSubmit} disabled={submitDisable}>送出訂單</button>
        </div>
    )
}

export default Cart