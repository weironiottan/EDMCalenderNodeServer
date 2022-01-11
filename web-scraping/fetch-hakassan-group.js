const axios = require("axios")
const EdmEvent = require('../models/edmevent');
const SendEmail = require("../utilities/send-email-alert")

async function fetchHakkasanGroupEvents() {
    let { data } = await axios.get('https://data.portaldriver.engineering/events.json')
    data = data.replaceAll("retrieveJSONP\(", "")
    data = data.replaceAll("\)", "") 
    let edmEvents = JSON.parse(data)
    edmEvents = edmEvents.data.filter(event => event.location.toLowerCase().includes("las vegas"))
    return edmEvents
}

async function setEDMEventModel(data) {
    let hasWebScrappingErrorOccured = false
    const edmEvents = []
    try {
        data.map((eventItem, index) => {
            const edmEvent = new EdmEvent({
                clubname : eventItem.venue_title,
                artistname: eventItem.title,
                artistimageurl: `https://assets.venuedriver.com/flyer/squared/2400/event/${eventItem.id}.jpg`,
                eventdate: eventItem.date + ' UTC-7:00',
                ticketurl: 'https://hakkasangroup.com/store/las-vegas/event/' + eventItem.id
              })
              edmEvents[index] = edmEvent
        })       
    } catch (error) {
        SendEmail.sendErrorEmailAlert(error)
        return hasWebScrappingErrorOccured = true;
    }
    console.log("Hakkassan Group fetching all Done!")
    return hasWebScrappingErrorOccured ? [] : edmEvents
}

async function getHakassanGroupEDMEvents() {
    const data = await fetchHakkasanGroupEvents()
    const hakkasanGroupEdmEvents = await setEDMEventModel(data)
    return hakkasanGroupEdmEvents
}

module.exports = { getHakassanGroupEDMEvents }