'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('products', [
      {
        title: 'Boeing F-15 EX',
        description: 'Fighter Jet Keluaran Boeing dari AS yang Terbaru',
        stok: 2,
        harga: 20000000,
        createdAt: new Date(),
        updatedAt: new Date(),
        categoryId: 1
      },
      {
        title: 'Sukhoi Su-35',
        description: 'Fighter Jet Keluaran Sukhoi dari Rusia yang Terbaru',
        stok: 20,
        harga: 2000000,
        createdAt: new Date(),
        updatedAt: new Date(),
        categoryId: 1
      },
      {
        title: 'UH-60 Blackhawk',
        description: 'ini adalah Helikopter Keluaran Sikorsky',
        stok: 10,
        harga: 800000,
        createdAt: new Date(),
        updatedAt: new Date(),
        categoryId: 2
      },
      {
        title: 'Mi-17 ',
        description: 'ini adalah Helikopter Keluaran Sikorsky',
        stok: 10,
        harga: 800000,
        createdAt: new Date(),
        updatedAt: new Date(),
        categoryId: 2
      }
  ]);
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('products', null, {});
  }
};