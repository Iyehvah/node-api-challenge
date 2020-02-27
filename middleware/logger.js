module.exports = (format) => {
    return (req, res, next) => {
        const {ip, method, url} = req
        const agent = req.get("user-agent")

        if( format === "short" ) {
            console.log(`${method} ${url}`)
        } else {
            console.log(`${ip} ${method} ${agent}`)
        }
        next()
    }
}