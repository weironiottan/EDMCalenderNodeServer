var express = require('express');
var router = express.Router();
const FindEDMController = require('../controllers/find-edm')

// Router for BasePath: /find-edm routes
router.get('/', FindEDMController.basePathController)
  
// Get all events from the: EDMEvents Collection
router.get('/all-events', FindEDMController.allEventsController)

// Find queries based on: key:value pairs of the schema object
// Ex. /event?artistname=martin is [ artistname: martin ]
router.get('/event', FindEDMController.eventQueryController)

// Find by Routename: clubname/zouk
router.get('/clubname/:id', FindEDMController.clubNameQueryController)

// Find by Routename: artistname/martin garrix
router.get('/artistname/:id', FindEDMController.artistNameQueryController)

// Find by Routename: artistimageurl/url
router.get('/artistimageurl/:id', FindEDMController.artistImageURLQueryController)

// Find by Routename: eventdate/date
router.get('/eventdate/:id', FindEDMController.eventDateQueryController)

// Find by Routename: ticketurl/url
router.get('/ticketurl/:id', FindEDMController.ticketURLQueryController)

module.exports = router