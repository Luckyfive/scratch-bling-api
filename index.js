//initial imports
const express = require('express');
const app = express();
var cors = require('cors');
const db = require('./db/queries');

app.use(
    cors({
        credentials: true,
        origin: true
    })
);
app.options('*', cors());

app.get('/backscratchers', (req, res) => {
    db.getAllBackscratchers()
        .then((items) => {
            return res.send(items);
          })
          .catch((err) => {
            // handle errors
            throw err;
          });
});

app.post('/backscratchers', async (req, res) => {
    return res.send('Received a POST HTTP method');
});

app.put('/backscratchers', async (req, res) => {
    return res.send('Received a PUT HTTP method');
});

app.delete('/backscratchers', async (req, res) => {
    return res.send('Received a DELETE HTTP method');
});

app.listen(process.env.PORT || 3000, function () {
    console.log('server running on port 3000', '');
});