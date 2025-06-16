"use strict";
const { Page, HeroSection } = require("../models");

module.exports = {
  async up() {
    const homePage = await Page.findOne({ where: { name: "home" } });

    if (!homePage) return;

    await HeroSection.create({
      pageId: homePage.id,
      heroImage: null,
      noOfProjects: 50,
      noOfClients: 20,
      satisfactionPercentage: 90,
      isDeleted: false,
    });
  },

  async down() {
    await HeroSection.destroy({ where: {} });
  },
};
