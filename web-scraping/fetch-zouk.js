const axios = require("axios")
const cheerio = require("cheerio")
const EdmEvent = require('../models/edmevent');
const fetchYear = require('../utilities/get-year-of-event');
const SendEmail = require("../utilities/send-email-alert")

/* 
Update: 02/06/2022
Zouk added lazy loading to their event page, Sadly I can't hit the events url to get all the event since it only shows
a subset of the events, There are two alternatives, either get puppeter or something similar to literally scroll down to load allvevents then scrape them
OR
fetch the same url that the lazy loaded feature on the event page does, I Implemented this method here, I figured it would be easier then installing a whole new package.
----

I am fetching the url for each month possible, we start at the current month then we hit each month until we don't get any more eventData. I deprecated the older Zouk script,
might come in useful if they decide to remove the lazy loading feature then this won't be needed
*/

async function fetchZoukEDMEvents() {

  // getMonth() is Index Zero based so need to add 1
  let currentMonth = new Date().getMonth() + 1
  let hasEventItems = false
  const edmEvents = []
  let hasWebScrappingErrorOccured = false

  do {
    const { data } = await axios.get(`https://zoukgrouplv.com/wp-admin/admin-ajax.php?action=uvwp_loadmoreevents&venuegroup=all&caldate=2022-${currentMonth}-01`)
    const $ = cheerio.load(data);
    hasEventItems = $('body').find('.eventitem').text() != '' ? true : false
    if(hasEventItems) {
      $('.eventitem').each((i, eventItem) =>{
        const year = fetchYear.getYearOfEvent($(eventItem))
        const edmEvent = new EdmEvent({
        clubname : $(eventItem).children(".venueurl").text(),
        artistname: $(eventItem).find(".uv-event-name").text(),
        artistimageurl: $(eventItem).find(".uv-boxitem.noloader").children().first().attr('data-bg'),
        eventdate: removePipeFromDate( $(eventItem).find(".info").children().first().text() ) + ` ${year}` + ' UTC-7:00',
        ticketurl: $(eventItem).find(".uv-boxitem.noloader").attr('href')
        })
        edmEvents.push(edmEvent)
      });
    }
    currentMonth++   
  } while (hasEventItems);

  if(edmEvents.length === 0) {
    SendEmail.sendErrorEmailAlert("Zouk event Data was not successful")
    console.log("error occured")
    hasWebScrappingErrorOccured = true;
  }

  console.log("Zouk fetching all Done!")
  return hasWebScrappingErrorOccured ? [] : edmEvents
}

function removePipeFromDate(eventDate)  {
  if( eventDate.includes("|") ) {
    eventDate = eventDate.slice(0, eventDate.indexOf("|") - 1).trim()
  } 
  return eventDate
}

module.exports = { fetchZoukEDMEvents };