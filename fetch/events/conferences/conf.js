'use strict'

const axios = require('axios')
const { parse } = require('path')
const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
const topics = ['all']
module.exports = async (ghtoken, tags) => {
  if (!(ghtoken && typeof ghtoken === 'string' && ghtoken.length > 0)) throw new Error('Please enter a valid github token')
  else if (!(tags && typeof tags === 'object' && tags.topics && typeof tags.topics === 'object' && tags.topics.length > 0 && tags.topics.every(top => typeof top === 'string' && top.length > 0))) throw new Error('Please enter valid tags')

  axios.defaults.headers.common.Authorization = `bearer ${ghtoken}`
  const { tree } = (await axios.get('https://api.github.com/repos/tech-conferences/conference-data/git/trees/main')).data
  const years = (await axios.get(tree.find(dir => dir.path === 'conferences').url)).data.tree
  const availYears = years.filter(years => Number(years.path) >= new Date().getFullYear())
  const mainapiStruct = await Promise.all(availYears.map(async (topics) => (await axios.get(topics.url)).data.tree))
  const totalConfinfo = await Promise.all(mainapiStruct.map(async (files, year) => {
    const yearlyConf = await Promise.all(files.map(async file => {
      topics.push(parse(file.path).name)
      if (tags.topics.includes('all') || tags.topics.includes(parse(file.path).name)) {
        const eventinfo = (await axios.get('https://raw.githubusercontent.com/tech-conferences/conference-data/main/conferences/' + availYears[year].path + '/' + file.path)).data
        return eventinfo.map(eachEventinfo => {
          eachEventinfo.year = availYears[year].path
          eachEventinfo.topic = parse(file.path).name
          eachEventinfo.isOver = new Date(eachEventinfo.endDate) < new Date().setHours(0, 0, 0, 0)
          eachEventinfo.month = monthNames[new Date(eachEventinfo.startDate).getMonth()]
          eachEventinfo.thisMonth = new Date(eachEventinfo.startDate).getMonth() === new Date().getMonth()
          return eachEventinfo
        })
      } else return null
    }))
    return ([].concat.apply([], yearlyConf))
  }))
  return {
    topics,
    data: ([].concat.apply([], totalConfinfo)).filter(n => n)
  }
}
