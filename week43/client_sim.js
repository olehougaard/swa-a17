const { callback, promise } = require('./server_sim.js')


callback.validate('admin', 'password', function(token) {
    callback.authorize(token, function(better_token) {
        callback.secret(0, token, function(secret) {
            console.log(secret)
        },
        error => console.log('Error: ' + error))
        callback.secret(1, token, function(secret) {
            console.log(secret)
        },
        error => console.log('Error: ' + error))
    },
    error => console.log('Error: ' + error))
})


promise.validate('admin', 'password')
.then(token => promise.authorize(token))
.then(token => Promise.all([
    promise.secret(0, token),
    promise.secret(1, token),
    promise.secret(3, token)
]))
.then(secrets => console.log(secrets))
.catch(error => console.log('Error: ' + error))
