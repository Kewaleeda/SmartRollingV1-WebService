const fs = require('fs');

var HashMap = require('hashmap');
var map = new HashMap();//("key",value);

function REST_ROUTER(router) {
    var self = this;
    self.handleRoutes(router);
}

REST_ROUTER.prototype.handleRoutes = function (router) {
    router.get('/bus', function (req, res) {
        fs.readFile('./gps_example.json', (err, data) => {
            if (err) throw err;
            var bus = JSON.parse(data);
            res.json(bus);
        });
    });
    router.post('/bus', function (req, res) {
        var newBusData = req.body;
        console.log(req.body);
        fs.readFile('./gps_example.json', (err, data) => {
            if (err) throw err;
            var bus = JSON.parse(data);
            for (var i = 0; i < bus.data.length; i++) {
                map.set(bus.data[i].busName, bus.data[i]);
            }

            var oldBusData = map.get(newBusData.busName);
            //New data ==> add new data
            if (typeof oldBusData == "undefined") {
                map.set(newBusData.busName, newBusData);
            }
            //Old data ==> update data
            else {
                map.set(oldBusData.busName, newBusData);
            }

            //clear old data and add new data
            bus.data = [];
            map.forEach(function (value, key) {
                bus.data.push(value);
            });

            fs.writeFileSync('./gps_example.json', JSON.stringify(bus));

            res.send(200);
        });
    });
}

module.exports = REST_ROUTER;