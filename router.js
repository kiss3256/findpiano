const Router = require('koa-router')
const router = new Router()

router.get('/getNews', require('./controller/getNews'))
router.get('/getStores', require('./controller/getStores'))
router.get('/getUsers', require('./controller/getUsers'))
router.get('/getMaps', require('./controller/getMaps'))

router.post('/login', require('./controller/login'))
router.post('/addUser', require('./controller/addUser'))
router.post('/addNews', require('./controller/addNews'))
router.post('/addStore', require('./controller/addStore'))

module.exports = router
