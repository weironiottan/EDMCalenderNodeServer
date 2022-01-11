const axios = require("axios")
const cheerio = require("cheerio")
const EdmEvent = require('../models/edmevent');
const fetchYear = require('../utilities/get-year-of-event')

async function fetchZoukEDMEvents() {
  const { data } = await axios.get("https://zoukgrouplv.com/events/")
  const $ = cheerio.load(data);
  const edmEvents = []
  let hasWebScrappingErrorOccured = false

  $('.eventitem').each((i, eventItem) =>{
    try {
      const year = fetchYear.getYearOfEvent($(eventItem))
      const edmEvent = new EdmEvent({
      clubname : $(eventItem).children(".venueurl").text(),
      artistname: $(eventItem).find(".uv-event-name").text(),
      artistimageurl: $(eventItem).find(".uv-boxitem.noloader").children().first().attr('data-bg'),
      eventdate: $(eventItem).find(".info").children().first().text() + ` ${year}` + ' UTC-7:00',
      ticketurl: $(eventItem).find(".uv-boxitem.noloader").attr('href')
      })
      edmEvents[i] = edmEvent
    } catch (error) {
      SendEmail.sendErrorEmailAlert(error)
      return hasWebScrappingErrorOccured = true;
    }
  });
  console.log("Zouk fetching all Done!")
  return hasWebScrappingErrorOccured ? [] : edmEvents
}

module.exports = { fetchZoukEDMEvents };