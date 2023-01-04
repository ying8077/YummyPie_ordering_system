const { pool } = require('./conn');

const getMenu = async() => {
    const [result] = await pool.query('SELECT * FROM `menu` ORDER BY `category`');
    return result
}

module.exports = {
    getMenu,
}