
const query = require('../mysql')

module.exports = async function(ctx) {
  
  ctx.body = await query('select * from fp_news')
}