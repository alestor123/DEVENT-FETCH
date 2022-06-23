'use strict'
const axios = require('axios')
const { parse } = require('path')
const topics = ['all']
module.exports = async (ghtoken) => {
  if (!(ghtoken && typeof ghtoken === 'string' && ghtoken.length > 0)) throw new Error('Please enter a valid github token')
  axios.defaults.headers.common.Authorization = `bearer ${ghtoken}`

  const { tree } = (await axios.get('https://api.github.com/repos/tech-conferences/conference-data/git/trees/main')).data
  const years = (await axios.get(tree.find(dir => dir.path === 'conferences').url)).data.tree
  const availYears = years.filter(years => Number(years.path) >= new Date().getFullYear())
  const mainapiStruct = (await Promise.all(availYears.map(async (topics) => (await axios.get(topics.url)).data.tree)))
  await Promise.all(mainapiStruct.map(async (files, year) => files.map(file => topics.push(parse(file.path).name))))
  return {
    topics
  }
}
