function getYearOfEvent(eventItem) {
    const currentYear = `${new Date().getFullYear()}`
    const attribute = eventItem.attr('yearmonth')
    eventYear = !!attribute ? attribute.slice(0,4) : false
    return !!eventYear ? eventYear : currentYear
  }

module.exports = { getYearOfEvent }

