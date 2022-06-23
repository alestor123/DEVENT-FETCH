'use strict'
const conferences = require('../../../fetch/events/conferences/conf')
module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Credentials', true)
  res.setHeader('Access-Control-Allow-Origin', '*')
  const data = await conferences(process.env.GHTOKEN, Object.keys(req.query).length > 0 ? req.query : { topics: ['all'] })
  res.json(data)
}
