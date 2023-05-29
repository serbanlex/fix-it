const OrderRepo = require('../infrastructure/repositories/order.repo');

module.exports = {
    async getAllOrders(req, res, next) {
        // #swagger.tags = ['Orders']
        try {
            const orderData = await OrderRepo.getAll();
            res.status(200).json(orderData);
        } catch (error) {
            next(error);
        }
    },

    async getOrderById(req, res, next) {
        // #swagger.tags = ['Orders']
        try {
            const orderData = await OrderRepo.getById(req.params.id);
            res.status(200).json(orderData);
        }
        catch (error) {
            next(error);
        }
    },

    async createOrder(req, res, next) {
        // #swagger.tags = ['Orders']
        /*  #swagger.parameters['order'] = {
                in: 'body',
                description: 'Basic order details',
                schema: {
                    $offeredServiceID: 1,
                    $clientID: 1,
                    $date: '2021-05-05',
                    $time: '12:00',
                    $state: 'pending',
                    $description: 'I need my sink fixed',
                    $address: '1234 Main St'   
                }
            }
        */
        try {
            const orderData = await OrderRepo.create(req.body);
            res.status(200).json(orderData);
        }
        catch (error) {
            next(error);
        }
    },

    async deleteOrder(req, res, next) {
        // #swagger.tags = ['Orders']
        try {
            const orderData = await OrderRepo.deleteById(req.params.id);
            res.status(200).json(orderData);
        }
        catch (error) {
            next(error);
        }
    },
    async getAllOrdersWithClientID(req, res, next) {
        // #swagger.tags = ['Orders']
        try {
            const orderData = await OrderRepo.getAllByClientId(req.params.clientID);
            res.status(200).json(orderData);
        }
        catch (error) {
            next(error);
        }
    },
    async getAllOrdersWithServiceOffererID(req, res, next) {
        // #swagger.tags = ['Orders']
        try {
            const orderData = await OrderRepo.getAllByServiceOffererId(req.params.serviceOffererID);
            res.status(200).json(orderData);
        }
        catch (error) {
            next(error);
        }
    }
};

