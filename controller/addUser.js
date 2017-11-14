
const query = require('../mysql')
const M = require('../utils/messages')
const MR = require('../utils/makeResult')

module.exports = async function(ctx) {
  
  try {
    const { username, password } = ctx.request.body
    if (username && password) {
      const sql = `INSERT INTO fp_user (name, password) VALUES ('${username}', '${password}')`
      await query(sql)
      ctx.body = M[10003]
    }
  } catch (e) {
    ctx.body = MR(e.message)
  }
  
}
