
const query = require('../mysql')

module.exports = async function(ctx) {
  
  ctx.body = await query('select id, title, DATE_FORMAT(time, \'%Y-%m-%d\') as time, abstract from fp_news');
}