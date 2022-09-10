const request = require('request');
const async = require('async')

const request_p = (options) => {
    return new Promise(async (resolve, reject) => {
        try {
            request(options, (error, response) => {
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

const combination = async (options) => {
    async.parallel([(cb) => {
        console.log(new Date(), 'section 1 start')
        const options1 = {
            'method': 'GET',
            'url': options.req1
        };

        request_p(options1).then((__res1) => {
            console.log(new Date(), 'section 1 end with response:', __res1)
            return cb()
        })

    }, (cb) => {
        console.log(new Date(), 'section 2 start')
        const options1 = {
            'method': 'GET',
            'url': options.req2
        };

        request_p(options1).then((__res1) => {
            console.log(new Date(), 'section 2 end with response:', __res1)
            return cb()
        })
    }], (err, res) => {
        process.exit(0)
    })
}

// experiment 1
combination({ 'req1': 'http://localhost:3000/api1?timeout=5000', 'req2': 'http://localhost:3000/api2?timeout=2000' })

// experiment 2
// combination({'req1':'http://localhost:3000/api2?timeout=2000','req2':'http://localhost:3000/api1?timeout=5000'})

