var express = require('express');
var router = express.Router();


function sleep(milliseconds) {
    const date = Date.now();
    let currentDate = null;
    do {
        currentDate = Date.now();
    } while (currentDate - date < milliseconds);
}

router.get('/api1', function(req, res, next) {
    let __start_time = new Date().valueOf()
    sleep(req.query.timeout)
    let __end_time = new Date().valueOf()
    return res.jsonp({ "name": "api1", 'start_time': __start_time, 'end_time': __end_time, 'execution_time': __end_time - __start_time, 'start_time_readable': new Date(__start_time).toISOString(), 'end_time_readable': new Date(__end_time).toISOString(), 'timeout': req.query.timeout })
});


router.get('/api2', function(req, res, next) {
    let __start_time = new Date().valueOf()
    setTimeout(function() {
        let __end_time = new Date().valueOf()
        return res.jsonp({ "name": "api2", 'start_time': __start_time, 'end_time': __end_time, 'execution_time': __end_time - __start_time, 'start_time_readable': new Date(__start_time).toISOString(), 'end_time_readable': new Date(__end_time).toISOString(), 'timeout': req.query.timeout })
    }, req.query.timeout)
})





module.exports = router;