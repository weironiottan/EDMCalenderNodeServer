const axios = require("axios")
const cheerio = require("cheerio")
const EdmEvent = require('../models/edmevent');
const fetchYear = require('../utilities/get-year-of-event')
const SendEmail = require("../utilities/send-email-alert")

async function fetchWynnGroupEDMEvents() {
  const { data } = await axios.get('https://www.wynnsocial.com/events/')
  const $ = cheerio.load(data);
  let edmEvents = []
  let hasWebScrappingErrorOccured = false

  $('.eventitem').each((i, eventItem) =>{
    try {
      const year = fetchYear.getYearOfEvent($(eventItem))
      const edmEvent = new EdmEvent({
      clubname : $(eventItem).children(".uv-events-venue").text(),
      artistname: $(eventItem).children(".info.uv-clearfix").children(".uv-events-name").text(),
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
  edmEvents = edmEvents.filter(edmEvent => !edmEvent.clubname.includes('wynn field club'))
  console.log("Wynn fetching all Done!");
  return hasWebScrappingErrorOccured ? [] : edmEvents
}

module.exports = { fetchWynnGroupEDMEvents };