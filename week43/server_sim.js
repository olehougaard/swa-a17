const token1 = 'JC5vbignYnV0dG9uJywgJ2NsaWNrJywgZnVuY3Rpb24gb25DbGljaygpIHsKICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gdGltZXIoKSB7CiAgICAgICAgY29uc29sZS5sb2coJ1lvdSBjbGlja2VkIHRoZSBidXR0b24hJyk7ICAgIAogICAgfSwgMjAwMCk7Cn0pOwoKY29uc29sZS5sb2coIkhpISIpOwoKc2V0VGltZW91dChmdW5jdGlvbiB0aW1lb3V0KCkgewogICAgY29uc29sZS5sb2coIkNsa'
const token2 = 'WNrIHRoZSBidXR0b24hIik7Cn0sIDUwMDApOwoKY29uc29sZS5sb2coIldlbGNvbWUgdG8gbG91cGUuIik7!!!PGJ1dHRvbj5DbGljayBtZSE8L2J1dHRvbj4%3D'
const top_secret = [
    'https://static1.squarespace.com/static/54e8ba93e4b07c3f655b452e/t/56c2a04520c64707756f4267/1493764650017/',
    'https://static.boredpanda.com/blog/wp-content/uploads/2016/08/cute-kittens-30-57b30ad41bc90__605.jpg',
    'https://cdn4.littlethings.com/app/uploads/2017/03/Wild-Cat-Kittens-3-600x405.jpg']
function block(ms) {
    const start = Date.now()
    while(Date.now() < start + ms);
}
function timeout_promise(ms, callback) {
    return new Promise( (resolve, reject) => {
        setTimeout(ms, () => callback(resolve, reject))
    })
}

module.exports = {
    blocking: {
        validate(username, password) { block(500); return token1 },
        authorize(token) { 
            block(800); 
            if (token1 == token) 
                return token2 
            else 
                throw new Exception('Unauthorized')
            },
        secret(number, token) {
            switch(number) {
                case 0:
                    block(5000)
                    if (token == token1 || token == token2)
                        return top_secret[0]
                    else
                        throw new Exception('Illegal access')
                case 1:
                    block(1000)
                    if (token == token2)
                        return top_secret[1]
                    else
                        throw new Exception('Illegal access')
                case 2:
                    block(2000)
                    if (token == token2)
                        return top_secret[1]
                    else
                        throw new Exception('Illegal access')
                default:
                    throw new Exception('File not found')
            }
        }
    },
    callback: {
        validate(username, password, callback) { setTimeout(500, () => callback(token1)) },
        authorize(token, callback, onError) { 
            setTimeout(800, () => { 
                if (token1 == token) 
                    callback(token2)
                else 
                    onError('Unauthorized')
            })
        },
        secret(number, token, callback, onError) {
            switch(number) {
                case 0:
                    setTimeout(5000, () => {
                        if (token == token1 || token == token2)
                            callback(top_secret[0])
                        else
                            onError('Illegal access')
                    })
                    break
                case 1:
                    setTimeout(1000, () => {
                        if (token == token2)
                            callback(top_secret[1])
                        else
                            onError('Illegal access')
                    })
                    break
                case 2:
                    setTimeout(2000, () => {
                        if (token == token2)
                            callback(top_secret[1])
                        else
                            onError('Illegal access')
                    })
                    break
                default:
                    onError('File not found')
            }
        }
    },
    promise: {
        validate(username, password) { return timeout_promise(500, resolve => resolve(token1)) },
        authorize(token) { 
            return timeout_promise(800, (resolve, reject) => {
                if (token1 == token) 
                    resolve(token2)
                else 
                    reject('Unauthorized')
                })
        },
        secret(number, token) {
            switch(number) {
                case 0:
                    return timeout_promise(5000, (resolve, reject) => {
                        if (token == token1 || token == token2)
                            resolve(top_secret[0])
                        else
                            reject('Illegal access')
                    })
                case 1:
                    return timeout_promise(1000, (resolve, reject) => {
                        if (token == token2)
                            resolve(top_secret[1])
                        else
                            reject('Illegal access')
                    })
                case 2:
                    return timeout_promise(2000, (resolve, reject) => {
                        if (token == token2)
                            resolve(top_secret[1])
                        else
                            reject('Illegal access')
                    })
                    default:
                        Promise.reject('File not found')
            }
        }
    }
}
