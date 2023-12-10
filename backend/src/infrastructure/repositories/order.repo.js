const { Order, OfferedService, Client, User, ServiceOfferer, Review, Service } = require("../models");
const { EntityNotFound } = require("../../exceptions");


class OrderRepository {
    async create(orderInfo) {
        var order = null;
        try {
            order = await Order.create(orderInfo);
            order.setOfferedService(orderInfo.offeredServiceID);
            order.setClient(orderInfo.clientID);
        } catch (error) {
            if (error.name === 'SequelizeForeignKeyConstraintError') {
                console.log(error);
                throw new EntityNotFound(`Order reference(s) not found`);
            }
            throw new Error('Failed to create order. Reason: ' + error);
        }
        return await this.getById(order.ID);
    }

    async getAll() {
        return await Order.findAll({
            include: [
                {
                    model: OfferedService,
                    include: [
                        {
                            model: ServiceOfferer,
                            include: [
                                {
                                    model: User,
                                    as: 'userInfo',
                                    attributes: { exclude: ['ID', 'createdAt', 'updatedAt', 'password'] }
                                },
                            ],
                        },
                        {
                            model: Review,
                        },
                        {
                            model: Service,
                        }
                    ],
                },
                {
                    model: Client,
                    include: [
                        {
                            model: User,
                            as: 'userInfo',
                            attributes: { exclude: ['ID', 'createdAt', 'updatedAt', 'password'] }
                        },
                    ],
                }
            ],
        });
    }

    async getById(id) {
        const order = await Order.findByPk(id, {
            include: [
                {
                    model: OfferedService,
                    include: [
                        {
                            model: ServiceOfferer,
                            include: [
                                {
                                    model: User,
                                    as: 'userInfo',
                                    attributes: { exclude: ['ID', 'createdAt', 'updatedAt', 'password'] }
                                },
                            ],
                        },
                    ],
                },
                {
                    model: Client,
                    include: [
                        {
                            model: User,
                            as: 'userInfo',
                            attributes: { exclude: ['ID', 'createdAt', 'updatedAt', 'password'] }
                        },
                    ],
                }
            ],

        });
        if (!order) {
            throw new EntityNotFound('Order not found');
        }
        return order;
    }

    async update(id, orderInfo) {
        const order = await this.getById(id);
        try {
            return await order.update(orderInfo);
        } catch (error) {
            throw new Error('Failed to update order. Reason: ' + error);
        }
    }

    async deleteById(id) {
        const order = await this.getById(id);
        try {
            await order.destroy();
        } catch (error) {
            throw new Error('Failed to delete order. Reason: ' + error);
        }
    }

    async getAllByClientId(id) {
        const order = await Order.findAll({
            where: {
                clientID: id
            },
            include: [
                {
                    model: OfferedService,
                    include: [
                        {
                            model: ServiceOfferer,
                            include: [
                                {
                                    model: User,
                                    as: 'userInfo',
                                    attributes: { exclude: ['ID', 'createdAt', 'updatedAt', 'password'] }
                                },
                            ],
                        },
                        {
                            model: Review,
                        },
                        {
                            model: Service,
                        }
                    ],
                },
                {
                    model: Client,
                    include: [
                        {
                            model: User,
                            as: 'userInfo',
                            attributes: { exclude: ['ID', 'createdAt', 'updatedAt', 'password'] }
                        },
                    ],
                },
            ],
        });
        if (!order) {
            throw new EntityNotFound('Order not found');
        }
        return order;
    }

    async getAllByServiceOffererId(id) {
        const orders = await Order.findAll({
            include: [
                {
                    model: OfferedService,
                    include: [
                        {
                            model: ServiceOfferer,
                            include: [
                                {
                                    model: User,
                                    as: 'userInfo',
                                    attributes: { exclude: ['ID', 'createdAt', 'updatedAt', 'password'] }
                                },
                            ],
                        },
                        {
                            model: Review,
                        },
                    ],
                },
                {
                    model: Client,
                    include: [
                        {
                            model: User,
                            as: 'userInfo',
                            attributes: { exclude: ['ID', 'createdAt', 'updatedAt', 'password'] }
                        },
                    ],
                }
            ],
        });

        const filteredOrders = orders.filter(order => order.OfferedService && order.OfferedService.ServiceOfferer && order.OfferedService.ServiceOfferer.ID == id);

        return filteredOrders;
    }

    async updateOrderState(id, state) {
        const order = await this.getById(id);
        try {
            return await order.update({ state: state });
        } catch (error) {
            throw new Error('Failed to update order. Reason: ' + error);
        }
    }

    async getAllByState(state) {
        const order = await Order.findAll({
            where: {
                state: state
            }
        });
        if (!order) {
            throw new EntityNotFound('Order not found');
        }
        return order;
    }

    async getAllByStateAndClientId(state, clientID) {
        const order = await Order.findAll({
            where: {
                state: state,
                clientID: clientID
            },
            include: [
                {
                    model: OfferedService,
                    include: [
                        {
                            model: ServiceOfferer,
                            include: [
                                {
                                    model: User,
                                    as: 'userInfo',
                                    attributes: { exclude: ['ID', 'createdAt', 'updatedAt', 'password'] }
                                },
                            ],
                        },
                    ],
                },
                {
                    model: Client,
                    include: [
                        {
                            model: User,
                            as: 'userInfo',
                            attributes: { exclude: ['ID', 'createdAt', 'updatedAt', 'password'] }
                        },
                    ],
                }
            ],
        });
        if (!order) {
            throw new EntityNotFound('Order not found');
        }
        return order;
    }
}

module.exports = new OrderRepository();