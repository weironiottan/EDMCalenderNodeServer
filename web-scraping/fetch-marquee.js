const axios = require("axios")
const cheerio = require("cheerio")
const EdmEvent = require('../models/edmevent');

async function fetchMarqueeEDMEvents() {
  const { data } = await axios.get("http://marquee.taogroup.com/")
  const $ = cheerio.load(data);
  const edmEvents = []

  $('.uvc-eventlist').find("a").each((i, eventItem) =>{
    const year = $('.uvc-eventlist').find("a").first().find('.uvc-elddate').text().trim().slice(-4)
    const edmEvent = new EdmEvent({
    clubname : "marquee",
    artistname: $(eventItem).find('.uvc-elevname').text(),
    artistimageurl: "https://" + $(eventItem).find('img').attr('src').slice(2),
    eventdate: `${$(eventItem).find('.uv-eldate-m').text()}` + `${$(eventItem).find('.uv-eldate-d').text()}` + ` ${year}` + ' UTC-7:00',
    ticketurl: $(eventItem).attr('href')
  })
    edmEvents[i] = edmEvent
  });
  return edmEvents
}

module.exports = { fetchMarqueeEDMEvents };