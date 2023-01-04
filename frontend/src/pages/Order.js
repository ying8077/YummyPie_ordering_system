import { useState } from "react";
import "../asset/styles/order.css"

const Order = () => {
    const order_local = localStorage.getItem("order");
    const [orders, setOrders] = useState(order_local ? JSON.parse(order_local) : []);

    return (
        <div className="order">
            <div className="order-header">
                <label>Order</label>
                <div className="header-logut"></div>
            </div>
            {orders.map((order, idx) => {
                return (
                    <div key={idx} className="order-items">
                        <label className="order-title">訂購內容 :</label>
                        <>
                            {order.order.map((item, idx) => {
                                return (
                                    <div key={idx} className="order-item">
                                        <div className="order-item-title">
                                            <span>{item.name}</span>
                                            <span className="order-item-price">${item.price}/ {item.quantity}份</span>
                                        </div>
                                        <div className="order-item-option">
                                            <span>{item.option}</span>
                                            <span>無備註</span>
                                        </div>
                                    </div>
                                )
                            })}
                        </>
                        <div className="order-items-total">
                            <span>Total:</span>
                            <span className="order-items-amount">${order.total}</span>
                        </div>
                        <div className="order-number">
                            <label className="order-title">訂單編號 : {order.id}</label>
                        </div>
                        <div className="order-detail">
                            <div>會員資訊：/</div>
                            <div>取餐方式：{order.dineWays}</div>
                        </div>
                    </div>
                )
            })}
        </div>
    )
}

export default Order