'use strict'

const topics = require('../../../fetch/events/conferences/topics')
module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Credentials', true)
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('cache-control', 's-maxage=86400, max-age=0');
  const data = await topics(process.env.GHTOKEN)
  res.json(data)
}
