const request = require('request')
const cheerio = require('cheerio')

const user = 'dieBijacz'
const format = 'count'

request.get(`https://github.com/${user}`, (error, response, body) => {

  if (error) console.log(error)
  if (response.statusCode === 404) {
    return {
      status: 404,
      message: `User ${user} not found`
    }
  }

  // Parse github profile page
  const $ = cheerio.load(body);
  const data = $('rect').get().reduce((data, rect) => {
    // Parse contributions value
    const value = (() => {
      const count = $(rect).data('count');
      if (format === 'activity') return count > 0;
      if (format === 'count') return count;
    })();
    console.log(value)

  }, {});
})