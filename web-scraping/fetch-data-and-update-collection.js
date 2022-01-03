const EdmEvent = require('../models/edmevent');
const fetchZouk = require('./fetch-zouk')
const fetchHakassanGroup = require('./fetch-hakassan-group')
const fetchWynn = require('./fetch-wynn')
// const fetchMarquee = require('./fetch-marquee') 

// Need to fix marquee scraping so it works reliably
// need to create fail safes so that if one script it does not bring other scraping to a stop
// create logging so that i get notified if it fails scrapping


async function fetchDataAndUpdateCollection() {
    try {
      const zoukEdmEvents = await fetchZouk.fetchZoukEDMEvents()
      const hakkasanGroupEdmEvents = await fetchHakassanGroup.getHakassanGroupEDMEvents()
      const wynnEdmEvents = await fetchWynn.fetchWynnGroupEDMEvents()
      // const marqueeEdmEvents = await fetchMarquee.fetchMarqueeEDMEvents()
      const _collectionDeleted = await EdmEvent.deleteMany()
      const _resultFromCollection = await EdmEvent.insertMany([
        ...zoukEdmEvents, 
        ...hakkasanGroupEdmEvents, 
        ...wynnEdmEvents, 
        // ...marqueeEdmEvents
      ])
      console.log('fetching data and updating the Collection has been completed Successfully')
    } catch(error) {
      console.log('fetching data and updating the Collection was NOT Successful :( ', error)
    }
  }

  module.exports = { fetchDataAndUpdateCollection }