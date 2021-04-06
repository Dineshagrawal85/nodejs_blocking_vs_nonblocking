var request = require('request');
let async = require('async')

let request_p = function(options) {
    return new Promise(async function(resolve, reject) {
        try {
            request(options, function(error, response) {
                if (error) throw new Error(error);
                if (typeof response.body == 'string') {
                    response.body = JSON.parse(response.body)
                }
                return resolve(response.body)
            });

        } catch (e) {
            return reject(e)
        }
    })
}

let __combination = async function(options) {
    async.parallel([function(cb) {
        console.log("section 1 start")
        let options1 = {
            'method': 'GET',
            'url': options.req1
        };

        request_p(options1).then(function(__res1) {
            console.log("section 1 end", __res1)
            return cb()
        })

    }, function(cb) {
        console.log("section 2 start")
        let options1 = {
            'method': 'GET',
            'url': options.req2
        };

        request_p(options1).then(function(__res1) {
            console.log("section 2 end", __res1)
            return cb()
        })
    }], function(err, res) {
        console.log("section final")
        process.exit(0)
    })
}

//experiment 1
__combination({"req1":"http://localhost:3000/api1?timeout=5000","req2":"http://localhost:3000/api2?timeout=2000"})

//experiment 2
//__combination({"req1":"http://localhost:3000/api2?timeout=2000","req2":"http://localhost:3000/api1?timeout=5000"})