const EdmEvent = require('../models/edmevent');

const ModelProperties = ['clubname', 'artistname', 'artistimageurl', 'eventdate', 'ticketurl']


const basePathController = (req, res, next) => {
    res.send('<h1>Base Path for EDM events</h1>')
}

const allEventsController = (req, res, next) => {
    EdmEvent.find()
        .then(result => {res.json(result)})
        .catch(error => console.log(error))
}

const eventQueryController = (req, res, next) => {
    const queryProperty = Object.keys(req.query)
    let queryValue = Object.values(req.query)   
    queryValue = new RegExp(queryValue)
    const queryItem = {[queryProperty]: queryValue}
    if(ModelProperties.some(property => property === queryProperty[0])) {
        EdmEvent.find(queryItem)
            .then(result => {res.json(result)})
            .catch(error => console.log(error))
    } else {
        res.send('<h1>Query not found  </h1>')
    }
}

const clubNameQueryController = (req, res, next) => {
    const id = new RegExp(req.params.id);
    EdmEvent.find({clubname: id})
        .then(result => {res.json(result)})
        .catch(error => console.log(error))
    
}

const artistNameQueryController = (req, res, next) => {
    const id = new RegExp(req.params.id);
    EdmEvent.find({artistname: id})
        .then(result => {res.json(result)})
        .catch(error => console.log(error))
    
}

const artistImageURLQueryController = (req, res, next) => {
    const id = new RegExp(req.params.id);
    EdmEvent.find({artistimageurl: id})
        .then(result => {res.json(result)})
        .catch(error => console.log(error))  
}

const eventDateQueryController = (req, res, next) => {
    const id = new RegExp(req.params.id);
    EdmEvent.find({eventdate: id})
        .then(result => {res.json(result)})
        .catch(error => console.log(error)) 
}

const ticketURLQueryController = (req, res, next) => {
    const id = new RegExp(req.params.id);
    EdmEvent.find({ticketurl: id})
        .then(result => {res.json(result)})
        .catch(error => console.log(error))
    
}

module.exports = {
    basePathController,
    allEventsController,
    eventQueryController,
    clubNameQueryController,
    artistNameQueryController,
    artistImageURLQueryController,
    eventDateQueryController,
    ticketURLQueryController
}