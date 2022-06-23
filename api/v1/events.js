'use strict'

const events = require('../../fetch/events/event')
module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Credentials', true)
  res.setHeader('Access-Control-Allow-Origin', '*')
  const data = await events(req.query)
  res.json(data)
}
