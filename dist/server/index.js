"use strict";

var _http = _interopRequireDefault(require("http"));

var _express = _interopRequireDefault(require("express"));

var _cors = _interopRequireDefault(require("cors"));

var _bodyParser = _interopRequireDefault(require("body-parser"));

var _routes = _interopRequireDefault(require("./routes"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

require('dotenv/config');

let app = (0, _express.default)();
app.server = _http.default.createServer(app);
app.use((0, _cors.default)());
app.use(_bodyParser.default.urlencoded({
  extended: false
}));
app.use(_bodyParser.default.json());
app.get('/healthcheck', function (req, res, next) {
  res.status(200).json({
    healthy: true
  });
});
app.use('/api/', _routes.default);
app.server.listen(process.env.PORT ? process.env.PORT * 1 : 8081, () => {
  console.log(`Started on port ${app.server.address().port}`);
});