require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors')

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/' + '1.0', [
    require('./routes/order_route'),
    require('./routes/menu_route')
]);

// Error handling
app.use(function (err, req, res, next) {
    console.log(err);
    res.status(500).send('Internal Server Error');
});

app.get('/', (req, res) => {
    res.send('connect!');
})

app.listen(8000, () => {
    console.log('the application is running on port8000!');
}); 

module.exports = app