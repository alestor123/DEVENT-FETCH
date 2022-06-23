'use strict'
const ray = require('x-ray')()
module.exports = async (all) => {
  // add all type check
  // https://javascript.hotexamples.com/examples/x-ray/-/default/javascript-default-function-examples.html
  const data = await ray('https://mlh.io/events', '.event', [{ name: '.event-link@title', date: '.event-date', url: '.event-link@href', banner: '.image-wrap img@src', icon: '.event-logo img@src', startDate: '.inner meta[itemprop="startDate"]@content', endDate: '.inner meta[itemprop="endDate"]@content', eventMode: '.event-hybrid-notes span@html', eventLocation: '.event-location span@html' }]).then(res => res)
  return (await Promise.all(data.map(async event => {
    event.isMLH = event.url.includes('organize.mlh.io') || event.url.includes('hackp.ac')
    event.checkInUrl = event.isMLH ? 'https://hackp.ac/' + event.name.replace(/ /g, '') + 'checkin' : undefined
    event.shortUrl = event.isMLH ? 'https://hackp.ac/' + event.name.replace(/ /g, '') : undefined
    event.isOver = new Date(event.endDate) < new Date().setHours(0, 0, 0, 0)
    event.date = event.date.replace(/\s+$/, '')
    if (event.isMLH) {
      const { startTime, endTime, description, whoCanAttend } = await ray(event.url, '.participants-events', { startTime: 'meta[itemprop="startDate"]@content', endTime: 'meta[itemprop="endDate"]@content', plainStartTime: '.lh-title@html', description: ['div[itemprop="description"] p@html'], whoCanAttend: ['.selectable button@html'] }).then(res => res)
      // console.log(event.url)
      event.startTime = startTime
      event.endTime = endTime
      event.description = description.join(' \n ')
      event.whoCanAttend = whoCanAttend
    }
    return all ? event : (event.isOver ? undefined : event)
  }))).filter(n => n)
}
