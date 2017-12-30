const config = require('../config');
const Sequelize = require('sequelize');
// db password: NC8Jo8GGBp6CodbP
// initialize proxy: indigovalley-shush:us-central1:iv-shush
const sequelize = new Sequelize('shush', 'root', 'NC8Jo8GGBp6CodbP', {
  host: '127.0.0.1',
  dialect: 'mysql',
});

// define user table
const User = sequelize.define('user', {
  name: Sequelize.STRING,
  // will add whatever isn't done through slack auth
});
User.sync();

const Moment = sequelize.define('moment', {
  dbChange: Sequelize.INTEGER,
  timestamp: Sequelize.DATE,
});

Moment.belongsTo(User, { foreignKey: 'id_user' });
Moment.sync();

const Trigger = sequelize.define('trigger', {
  gate: Sequelize.INTEGER,
  message: Sequelize.STRING,
  clip: Sequelize.STRING,
});

Trigger.belongsTo(User, { foreignKey: 'id_user' });
Trigger.sync();

const Event = sequelize.define('event', {
  timestamp: Sequelize.DATE,
});

Event.belongsTo(Trigger, { foreignKey: 'id_trigger' });
Event.sync();



module.exports = {
  User,
  Moment,
  Trigger,
  Event,
  Channel,
  Channel_Trigger,
}