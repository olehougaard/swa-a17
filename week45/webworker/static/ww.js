self.addEventListener('message', function(e) {
    self.postMessage('You said: ' + e.data)
})
