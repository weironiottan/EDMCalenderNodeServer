const axios = require("axios")
const cheerio = require("cheerio")
const EdmEvent = require('../models/edmevent');

async function fetchWynnGroupEDMEvents() {
  const { data } = await axios.get('https://www.wynnsocial.com/events/')
  const $ = cheerio.load(data);
  const edmEvents = []

  $('.eventitem').each((i, eventItem) =>{
    const edmEvent = new EdmEvent({
    clubname : $(eventItem).children(".uv-events-venue").text(),
    artistname: $(eventItem).children('.uv-events-venue').text(),
    artistimageurl: $(eventItem).find(".uv-boxitem.noloader").children().first().attr('data-bg'),
    eventdate: $(eventItem).find(".info").children().first().text() + ' 2021' + ' UTC-7:00',
    ticketurl: $(eventItem).find(".uv-boxitem.noloader").attr('href')
  })
    edmEvents[i] = edmEvent
  });
  return edmEvents
}
fetchWynnGroupEDMEvents()

module.exports = { fetchWynnGroupEDMEvents };