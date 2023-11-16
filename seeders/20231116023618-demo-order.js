'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('orders', [
      {
        userId: 1,
        productId: 1,
        orderDate: new Date('2023-11-15T06:45:28.000Z'), // Tanggal pesanan pertama
        status: 'Dalam Proses',
        quantity: 1,
        totalPrice: 20000000,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        userId: 1,
        productId: 1,
        orderDate: new Date('2023-11-16T08:30:00.000Z'), // Tanggal pesanan kedua
        status: 'Selesai',
        quantity: 2,
        totalPrice: 1600000,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        userId: 1,
        productId: 2,
        orderDate: new Date('2023-11-19T08:30:00.000Z'), // Tanggal pesanan kedua
        status: 'Selesai',
        quantity: 1,
        totalPrice: 800000,
        createdAt: new Date(),
        updatedAt: new Date(),
      }
  ]);
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('orders', null, {});
  }
};