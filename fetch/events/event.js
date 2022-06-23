'use strict'

const mlhevents = require('../events/hackathons/mlh/mlh')
const hackClubevents = require('../events/hackathons/hackclub/events')
const confevents = require('../events/conferences/conf')

module.exports = async (topics) => {
  return {
    devconf: await confevents(process.env.GHTOKEN, Object.keys(topics).length > 0 ? topics : { topics: ['all'] }),
    hackathons: {
      mlh: await mlhevents(topics.all),
      hackclub: await hackClubevents(topics.all)
      // add hckclub all events option
    }
  }
}
