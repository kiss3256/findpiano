
const query = require('../mysql')

module.exports = async function(ctx) {
  
  let parent = await query('select id, area_name from fp_map where parent_id=0');
  for (let i=0; i<parent.length; ++i) {
    parent[i].citys = await query('select id, area_name from fp_map where parent_id='+parent[i].id+'');
  }
  ctx.body = parent;
}