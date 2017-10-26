const { promise: { validate, authorize, secret } } = require('./server_sim.js')

validate()
.then (authorize)
.then (auth => Promise.all([0,1,2].map(i => secret(i, auth))))
.then (console.log)
