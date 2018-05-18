module.exports = (params) => {

    const five = require('johnny-five')
    const board = new five.Board()

    board.on("ready", () => {
        
        console.log('------ Ready ------')

        // Proximity
        const proximity = require('./src/proximity')(five, { id: '03', once: true })
    })
}