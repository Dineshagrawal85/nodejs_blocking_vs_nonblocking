const express = require('express');
const router = express.Router();

const sleep = (milliseconds) => {
    const date = Date.now();
    let currentDate = null;
    do {
        currentDate = Date.now();
    } while (currentDate - date < milliseconds);
}

router.get('/api1', (req, res, next) => {
    const start_time = new Date().valueOf();
    sleep(req.query.timeout);
    const end_time = new Date().valueOf();
    return res.jsonp({ name: 'api1', start_time, end_time, execution_time: end_time - start_time, start_time_readable: new Date(start_time).toISOString(), end_time_readable: new Date(end_time).toISOString(), timeout: req.query.timeout });
});

router.get('/api2', (req, res, next) => {
    const start_time = new Date().valueOf();
    setTimeout(() => {
        const end_time = new Date().valueOf();
        return res.jsonp({ name: 'api2', start_time, end_time, execution_time: end_time - start_time, start_time_readable: new Date(start_time).toISOString(), end_time_readable: new Date(end_time).toISOString(), timeout: req.query.timeout });
    }, req.query.timeout);
});

module.exports = router;