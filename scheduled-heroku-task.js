const connect = require('./utilities/connect-mongoDB')
const fetch = require('./web-scraping/fetch-data-and-update-collection')

async function scheduledHerokuTasks() {
    try {
        console.log('Starting scheduledTask: connectMongoDB')
        const _connectionResultawait = await connect.connectMongoDB()
        console.log('Starting scheduledTask: fetchDataAndUpdateCollection')
        const _resultFromFetchingData = await fetch.fetchDataAndUpdateCollection()
        console.log('Completed Scheduled Task Successfully')
        process.exit()
    } catch(error) {
        console.log('Scheduled Task failed: ', error)
    }
}

scheduledHerokuTasks()