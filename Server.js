const express = require('express');
const bodyParser = require("body-parser");
const rest = require("./Routers.js");
const app = express();

function REST() {
    var self = this;
    self.configureExpress();
};

REST.prototype.configureExpress = function () {
    var self = this;
    var router = express.Router();
    //support parsing of application/json type post data
    app.use(bodyParser.json());
    //support parsing of application/x-www-form-urlencoded post data
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use('/api/v1', router);
    
    var rest_router = new rest(router);
    self.startServer();
}

REST.prototype.startServer = function () {
    app.listen(process.env.PORT || 5000, function () {
        console.log("All right ! I am alive at Port 5000.");
    });
}

new REST();