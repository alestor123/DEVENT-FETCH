'use strict'
const axios = require('axios')
module.exports = async (all) => {
  const data = (await axios.get('https://hackathons.hackclub.com/api/events/upcoming')).data
  return data
}
