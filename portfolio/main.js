const request = require('request')
const cheerio = require('cheerio')
const _ = require('lodash');

const user = 'dieBijacz'
const format = 'count'
const values = []

request.get(`https://github.com/${user}`, (error, response, body) => {

  if (error) console.log(error)
  if (response.statusCode === 404) {
    return {
      status: 404,
      message: `User ${user} not found`
    }
  }

  const $ = cheerio.load(body);
  $('rect').get().reduce((data, rect) => {
    const value = (() => {
      const count = $(rect).data('count');
      const date = $(rect).data('date')
      return { count, date };
    })();
    values.push(value)
  }, {});
  console.log(values)
})
