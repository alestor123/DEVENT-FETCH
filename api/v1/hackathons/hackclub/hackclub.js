'use strict'

const events = require('../../../../fetch/events/hackathons/hackclub/events')
module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Credentials', true)
  res.setHeader('Access-Control-Allow-Origin', '*')
  const data = await events()
  res.json(data)
}
