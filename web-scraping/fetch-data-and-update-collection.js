const EdmEvent = require('../models/edmevent');
const fetchZouk = require('./fetch-zouk')
const fetchHakassanGroup = require('./fetch-hakassan-group')
const fetchWynn = require('./fetch-wynn')
const fetchMarquee = require('./fetch-marquee') 
const SendEmail = require("../utilities/send-email-alert")

async function fetchDataAndUpdateCollection() {
    try {
      const zoukEdmEvents = await fetchZouk.fetchZoukEDMEvents()
      const hakkasanGroupEdmEvents = await fetchHakassanGroup.getHakassanGroupEDMEvents()
      const wynnEdmEvents = await fetchWynn.fetchWynnGroupEDMEvents()
      const marqueeEdmEvents = await fetchMarquee.fetchMarqueeEDMEvents()
      const _collectionDeleted = await EdmEvent.deleteMany()
      const _resultFromCollection = await EdmEvent.insertMany([
        ...zoukEdmEvents, 
        ...hakkasanGroupEdmEvents, 
        ...wynnEdmEvents, 
        ...marqueeEdmEvents
      ])
      console.log('Fetching data and updating the EDM Events  Collection has been completed Successfully')
    } catch(error) {
      SendEmail.sendErrorEmailAlert(error)
      console.log('Fetching data and updating the EDM Events Collection was NOT Successful :( ', error)
    }
  }

  module.exports = { fetchDataAndUpdateCollection }