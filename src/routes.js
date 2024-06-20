const { Router } = require('express');

const UserController = require('./app/controllers/UserController');
const StoreController = require('./app/controllers/StoreController');
const PaymentController = require('./app/controllers/PaymentController');

const router = Router();



// Rota para listar cobranças Pix
router.get('/api/external', PaymentController.buscaProduto);
router.get('/api/pixQrCode/:id', PaymentController.pixQrCode);
router.get('/api/details/:txid', PaymentController.pixDetail);
router.post('/api/createCharge', PaymentController.createCharge);

//GET
router.get('/store/search', StoreController.index);
router.get('/store/products', StoreController.getProducts);
router.get('/store/:id', StoreController.show);
router.get('/store/mystore/:userid', StoreController.findMyStore);
router.get('/cart/:userid', UserController.chartById);
router.get('/cart/product/:prodid', UserController.findByProductId);
router.get('/search/:id', UserController.findUser)
router.get('/order/:userid', UserController.orderById)


//POST
router.post('/cadaster', UserController.store);
router.post('/login', UserController.login);
router.post('/store/cadaster', UserController.createStore);
router.post('/store/add', UserController.createProduct);
router.post('/create/order', UserController.createOrder);

//PUT
router.put('/cart/add/:userid/:prodid', UserController.addToCart);

//DELETE
router.delete('/cart/delete/:userid/:prodid', UserController.removeFromCart);

module.exports = router;
