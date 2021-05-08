const express = require('express');
const app = express();
var cors = require('cors');

app.use(
    cors({
        credentials: true,
        origin: true
    })
);
app.options('*', cors());

app.get('/backscratchers', (req, res) => {
    return res.send('Received a GET HTTP method');
});

app.post('/backscratchers', (req, res) => {
    return res.send('Received a POST HTTP method');
});

app.put('/backscratchers', (req, res) => {
    return res.send('Received a PUT HTTP method');
});

app.delete('/backscratchers', (req, res) => {
    return res.send('Received a DELETE HTTP method');
});

app.listen(process.env.PORT || 3000, function () {
    console.log('server running on port 3000', '');
});