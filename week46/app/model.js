const url = require('url')

module.exports = (() => {
    let urls = ['https://i.stack.imgur.com/sOjhw.png']

    let index = 0

    const current = () => urls[index]
    const next = () => index = (index + 1) % urls.length
    const show = files => {
        urls = files
            .map(pathname => ({ protocol: 'file', pathname }))
            .map(url.format)
    }

    return { current, next, show }
})()