const Menu = require('../models/menu_model');

const getMenu = async (req, res) => {
    const items = await Menu.getMenu();
    const categorys = [];
    const menu = {};

    items.map((item) => {
        if (categorys.findIndex(c => c === item.category) === -1) {
            categorys.push(item.category);
        }
    })

    categorys.map((category) => {
        items.map((item) => {
            if (item.category === category) {
                menu[category] === undefined ?
                    menu[category] = [item] : menu[category].push(item);
            }
        })
    })

    res.send({'category': categorys, 'items': menu});
}

module.exports = {
    getMenu,
}