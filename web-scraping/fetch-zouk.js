const axios = require("axios")
const cheerio = require("cheerio")
const EdmEvent = require('../models/edmevent');

async function fetchZoukEDMEvents() {
  const { data } = await axios.get("https://zoukgrouplv.com/events/")
  const $ = cheerio.load(data);
  const edmEvents = []
  $('.eventitem').each((i, eventItem) =>{
    const edmEvent = new EdmEvent({
    clubName : $(eventItem).children(".venueurl").text(),
    artistName: $(eventItem).find(".uv-event-name").text(),
    artistImageURL: $(eventItem).find(".uv-boxitem.noloader").children().first().attr('data-bg'),
    eventDate: $(eventItem).find(".info").children().first().text() + ' 2021' + ' UTC-7:00',
    ticketURL: $(eventItem).find(".uv-boxitem.noloader").attr('href')
  })
    edmEvents[i] = edmEvent

  });
  return edmEvents
}

module.exports = { fetchZoukEDMEvents };