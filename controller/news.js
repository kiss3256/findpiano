
const query = require('../mysql')
const M = require('../utils/messages')
const MR = require('../utils/makeResult')

const appendNews = async ctx => {
  try {
    const { title, time, content } = ctx.request.body;
    const abstract = content.substring(0, 80);

    const sql = `INSERT INTO fp_news (title, time, abstract, content)
                VALUES
                ('${title}', '${time}', '${abstract}', '${content}')`;

    const ret = await query(sql);
    if (ret.affectedRows) {
      ctx.body = M['10004'];
    } else {
      ctx.body = M['10005'];
    }

  } catch (e) {
    ctx.body = MR(e.message);
    throw e;
  }
}

const removeNews = async ctx => {
  try {
    const { id } = ctx.params;
    const sql = `DELETE FROM fp_news WHERE id=${id}`;
    await query(sql);
    ctx.body = M['10006'];
  } catch (e) {
    ctx.body = MR(e.message);
    throw e;
  }
}

const setNews = async ctx => {
  try {
    const fieldObj = { id, title, time, content } = ctx.request.body;
    fieldObj.abstract = content.substring(0, 80);

    const fields = Object.keys(fieldObj)
                     .map(key => `${key}='${fieldObj[key]}'`)
                     .join(' ')
    const sql = `UPDATE fp_news SET ${fields} WHERE id=${id}`;
    const ret = await query(sql);
    if (ret.affectedRows) {
      ctx.body = M['10008'];
    } else {
      ctx.body = M['10009'];
    }

  } catch (e) {
    ctx.body = MR(e.message);
    throw e;
  }
}

const getNewsList = async ctx => {
  ctx.body = await query('SELECT id, title, DATE_FORMAT(time, \'%Y-%m-%d\') as time, abstract FROM fp_news');
}

const getNewsById = async ctx => {
  const {id} = ctx.params;
  ctx.body = await query('SELECT id, title, DATE_FORMAT(time, \'%Y-%m-%d\') as time, content FROM fp_news WHERE id='+id);
}

exports.appendNews  = appendNews
exports.removeNews  = removeNews
exports.setNews     = setNews
exports.getNewsList = getNewsList
exports.getNewsById = getNewsById
