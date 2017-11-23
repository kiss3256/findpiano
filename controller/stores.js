
const query = require('../mysql')
const M = require('../utils/messages')
const MR = require('../utils/makeResult')

const appendStore = async ctx =>  {
  try {
      const {name, tel, city, address, snapshot} = ctx.request.body;
      const sql = `INSERT INTO fp_store (name, tel, city, address, snapshot)
                  VALUES
                  ('${name}', '${tel}', ${city}, '${address}', '${snapshot}')`

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

const removeStore = async ctx => {
  try {
    const id = ctx.params.id;
    const sql = 'DELETE FROM fp_store WHERE id='+id;
    const ret = await query(sql);
    if (ret.affectedRows) {
        ctx.body = M['10006'];
    } else {
        ctx.body = M['10007'];
    }
  } catch (e) {
      ctx.body = MR(e.message);
      throw e;
  }
}

const setStore = async ctx => {
  try {
    const fieldObj = {id, name, tel, city, address, snapshot} = ctx.request.body;
    const fields = Object.keys(fieldObj)
                     .map(key => `${key}='${fieldObj[key]}'`)
                     .join(' ')
    const sql = `UPDATE fp_store SET ${fields} WHERE id=${id}`;
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

const getStores = async ctx => {
  const sql = 'select fs.id, fs.name, fs.tel, fm.area_name as city, fm.id as cityId, (select fp.area_name from findpiano.fp_map fp where fp.id = fm.parent_id) as province, fs.address, fs.snapshot from findpiano.fp_store fs left join fp_map fm on fs.city = fm.id'
  ctx.body = await query(sql)
}

const getMaps = async ctx => {
  const sql = 'SELECT id, area_name FROM fp_map WHERE parent_id=0'
  const province = await query(sql);
  for (var i = 0; i < province.length; i++) {
    province[i].citys = await query(`select id, area_name from fp_map where parent_id=${province[i].id}`)
  }
  ctx.body = province;
}


exports.appendStore = appendStore
exports.removeStore = removeStore
exports.setStore    = setStore
exports.getStores   = getStores
exports.getMaps     = getMaps
