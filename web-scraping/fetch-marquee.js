const axios = require("axios")
const cheerio = require("cheerio")
const EdmEvent = require('../models/edmevent');
const SendEmail = require("../utilities/send-email-alert")

async function fetchMarqueeEDMEvents() {
  const { data } = await axios.get("http://marquee.taogroup.com/")
  const $ = cheerio.load(data);
  const edmEvents = []
  let hasWebScrappingErrorOccured = false

  $('.uvc-eventlist').find("a").each((i, eventItem) =>{
    try {
      const year = $(eventItem).find('.uvc-elddate').text().trim().slice(-4)
      const edmEvent = new EdmEvent({
      clubname : "marquee",
      artistname: $(eventItem).find('.uvc-elevname').text(),
      artistimageurl: "https://" + $(eventItem).find('img').attr('src').slice(2),
      eventdate: `${$(eventItem).find('.uv-eldate-m').text()}` + `${$(eventItem).find('.uv-eldate-d').text()}` + ` ${year}` + ' UTC-7:00',
      ticketurl: $(eventItem).attr('href')
    })
      edmEvents[i] = edmEvent
    } catch (error) {
      SendEmail.sendErrorEmailAlert(error)
      return hasWebScrappingErrorOccured = true;
    }
  });
  console.log("Marquee fetching all Done!");
  return hasWebScrappingErrorOccured ? [] : edmEvents
}




module.exports = { fetchMarqueeEDMEvents };