const { pool } = require('./conn');

const createOrder = async (order) => {
    const [result] = await pool.query('INSERT INTO `food_order` SET ?', order);
    return result.insertId;
}

module.exports = {
    createOrder,
};