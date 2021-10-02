const axios = require("axios")
const cheerio = require("cheerio")
const EdmEvent = require('../models/edmevent');

async function fetchZoukEDMEvents() {
  const { data } = await axios.get("https://zoukgrouplv.com/events/")
  const $ = cheerio.load(data);
  const edmEvents = []
  $('.eventitem').each((i, eventItem) =>{
    const edmEvent = new EdmEvent({
    clubname : $(eventItem).children(".venueurl").text(),
    artistname: $(eventItem).find(".uv-event-name").text(),
    artistimageurl: $(eventItem).find(".uv-boxitem.noloader").children().first().attr('data-bg'),
    eventdate: $(eventItem).find(".info").children().first().text() + ' 2021' + ' UTC-7:00',
    ticketurl: $(eventItem).find(".uv-boxitem.noloader").attr('href')
  })
    edmEvents[i] = edmEvent

  });
  return edmEvents
}

module.exports = { fetchZoukEDMEvents };