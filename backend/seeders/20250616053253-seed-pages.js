"use strict";
const { Page } = require("../models");

module.exports = {
  async up() {
    await Page.bulkCreate([
      { name: "home", isDeleted: false },
      { name: "about", isDeleted: false },
      { name: "careers", isDeleted: false },
      { name: "contact", isDeleted: false },
    ]);
  },

  async down() {
    await Page.destroy({ where: {} });
  },
};
