const router = require('express').Router();
const { wrapAsync } = require('../util/util');
const { getMenu } = require('../controllers/menu_controller');

router.route('/menu').get(wrapAsync(getMenu));

module.exports = router;
