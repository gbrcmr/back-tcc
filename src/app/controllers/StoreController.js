const StoreRepository = require('../repositories/StoreRepository');


class StoreController {
    async index(request, response) {
        const stores = await StoreRepository.findAll();

        response.json(stores);
    }

    async getProducts(request, response) {
        const products = await StoreRepository.findAllProducts();

        response.json(products);
    }

    async show(request, response) {
        const { id } = request.params;

        const store = await StoreRepository.findById(id);

        response.json(store);
    }

    async findMyStore(request, response) {
        const { userid } = request.params;

        const storeid = await StoreRepository.findMyStore(userid);

        response.json(storeid);
    }

    async addToCart(request, response) {
        const { userid, prodids } = request.body;
        const cart = await StoreRepository.createStore(userid, prodids);
        response.json(cart);
    }

}


module.exports = new StoreController();