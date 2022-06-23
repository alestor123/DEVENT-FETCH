'use strict'

const topics = require('../../../fetch/events/conferences/topics')
module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Credentials', true)
  res.setHeader('Access-Control-Allow-Origin', '*')
  console.log(req.query)
  const data = await topics(process.env.GHTOKEN)
  res.json(data)
}
