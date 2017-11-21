const cityController = require('./citys.controller');
module.exports = (app) => {
  app.route('/api/city/cityList')
      .get(cityController.getCityList);

  app.route('/api/city/cityGtThousand')
      .get(cityController.getCityGtThousand);

  app.route('/api/city/getITPerson')
      .get(cityController.getITPerson);

  app.route('/api/city/sortByPerson')
      .get(cityController.sortByPerson);

    app.route('/api/city/getSecondCity')
        .get(cityController.getSecondCity);

    app.route('/api/city/getRandomCity')
        .get(cityController.getRandomCity);
};