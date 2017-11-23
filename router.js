const Router = require('koa-router')
const router = new Router()

const newsController  = require('./controller/news')
const storeController = require('./controller/stores')
const userController  = require('./controller/users')

router.post('/appendNews',   newsController.appendNews)
router.get('/removeNews/:id', newsController.removeNews)
router.post('/setNews',      newsController.setNews)
router.get('/getNewsList',   newsController.getNewsList)
router.get('/getNewsById/:id', newsController.getNewsById)


router.post('/appendStore',    storeController.appendStore)
router.get('/removeStore/:id', storeController.removeStore)
router.post('/setStore',     storeController.setStore)
router.get('/getStores',     storeController.getStores)
router.get('/getMaps',       storeController.getMaps)

router.post('/login', userController.login)

module.exports = router
