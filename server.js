const express = require('express');
const bodyParser = require('body-parser')
const app = express();
const http = require('http');
const server = http.createServer();
const logger = require('morgan');
const cors = require('cors');
var code = 200;
/**
 * Rutas
 */
const users = require('./routes/userRoutes');

const port = process.env.PORT || 3000;

app.use(logger('dev'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(cors());
app.disable('x-powered-by');
app.set('port', port);

//LLamando a las rutas
users(app);


app.listen(port, () => {
    console.info("Application nodejs ", process.pid, " iniciada... port ", port);
});


app.use(( req, res, next) => {
    console.log('req --> ', req)
    console.log('res --> ', res)
    res.status(code);
    res.send('server answer!');
});

module.exports = {
    app: app,
    server: server
}
