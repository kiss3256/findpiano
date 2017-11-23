
const query = require('../mysql')
const M = require('../utils/messages')
const MR = require('../utils/makeResult')

const login = async ctx => {
  try {
    const { username, password } = ctx.request.body
    if (username && password) {
      const sql = `select id, name as username from fp_user where name='${username}' and password='${password}'`
      const user = await query(sql)
      if (user.length) {
        const result = {...M[10001], 'result': user[0]}
        ctx.body = result
      } else {
        ctx.body = M[10002]
      }
    }
  } catch (e) {
    ctx.body = MR(e.message)
  }
}

exports.login = login;
