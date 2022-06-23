'use strict'

const events = require('../../../../fetch/events/hackathons/mlh/mlh')
module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Credentials', true)
  res.setHeader('Access-Control-Allow-Origin', '*')
  const data = await events(req.query.all)
  res.json(data)
}
