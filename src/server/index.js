require('dotenv/config');
import http from 'http';
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import routes from './routes';

let app = express();
app.server = http.createServer(app);

app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.get('/healthcheck', function(req, res, next) {
    res.status(200).json({ healthy: true });
});
app.use('/api/', routes);

app.server.listen(process.env.PORT ? process.env.PORT * 1 : 8081, () => {
    console.log(`Started on port ${app.server.address().port}`);
});