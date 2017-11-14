
const query = require('../mysql')

module.exports = async function(ctx) {

  
  const sql = 'select fs.id, fs.name, fs.tel, fm.area_name as city, fm.id as cityId, (select fp.area_name from findpiano.fp_map fp where fp.id = fm.parent_id) as province, fs.address, fs.snapshot from findpiano.fp_store fs left join fp_map fm on fs.city = fm.id'
  ctx.body = await query(sql)
  
}