const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve('Resolved data.')
    }, 2000)
})

promise.then(data => {
    console.log(data)
})