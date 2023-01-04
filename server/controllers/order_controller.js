const Order = require('../models/order_model');

const createOrder = async (req, res) => {
    const data = req.body;
    const order = data.order;
    const food_id = [];
    const food_name = [];
    const food_price = [];

    for (let i = 0; i < order.length; i++) {
        const food = order[i];
        for (let i = 0; i < food.quantity; i++) {
            food_id.push(`"${food.id.toString()}"`);
            food_name.push(`"${food.title}"`);
            food_price.push(`"${food.price.toString()}"`);
        }
    }

    const orderRecord = {
        food_id: `[${food_id}]`,
        food_name: `[${food_name}]`,
        food_price: `[${food_price}]`,
        totalPrice: data.total,
        status: 0,
        user: 'X',
        dineWays: data.dineWays,
        datetime: new Date()
    };
    const orderId = await Order.createOrder(orderRecord);
    console.log(orderId);
    res.send({ orderId });
};

module.exports = {
    createOrder,
}