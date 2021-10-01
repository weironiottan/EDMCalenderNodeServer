const EdmEvent = require('../models/edmevent');
const fetchZouk = require('./fetch-zouk')
const fetchHakassanGroup = require('./fetch-hakassan-group')
const fetchWynn = require('./fetch-wynn')

async function fetchDataAndUpdateCollection() {
    try {
      const zoukEdmEvents = await fetchZouk.fetchZoukEDMEvents()
      const hakkasanGroupEdmEvents = await fetchHakassanGroup.getHakassanGroupEDMEvents()
      const wynnEdmEvents = await fetchWynn.fetchWynnGroupEDMEvents()
      const _collectionDeleted = await EdmEvent.deleteMany()
      const resultFromCollection = await EdmEvent.insertMany([...zoukEdmEvents, ...hakkasanGroupEdmEvents, ...wynnEdmEvents])
      console.log('fetching data and updating the Collection has been completed successfully')
    } catch(error) {
      console.log(error, 'uh oh something bad has happend :(')
    }
  }

  module.exports = { fetchDataAndUpdateCollection }