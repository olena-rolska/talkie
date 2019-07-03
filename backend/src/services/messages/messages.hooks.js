
// Hooks for service `messages`. (Can be re-generated.)
const commonHooks = require('feathers-hooks-common');
const { authenticate } = require('@feathersjs/authentication').hooks;
// !code: imports
const authHooks = require('feathers-authentication-hooks');
const { protect } = require('@feathersjs/authentication-local').hooks;
// !end

// !<DEFAULT> code: used
// eslint-disable-next-line no-unused-vars
const { iff } = commonHooks;
// eslint-disable-next-line no-unused-vars
const { create, update, patch, validateCreate, validateUpdate, validatePatch } = require('./messages.validate');
// !end

// !code: init
const includeUser = (context) => {
  // Get the Sequelize instance. In the generated application via:
  const sequelize = context.app.get('sequelizeClient');
  const { users } = sequelize.models;

  context.params.sequelize = {
    include: [ users ],
    raw: false,
  };

  return context;
};
// !end

let moduleExports = {
  before: {
    // Your hooks should include:
    //   all   : authenticate('jwt')
    // !code: before
    all: [ authenticate('jwt') ],
    find: [ includeUser ],
    get: [ includeUser ],
    create: [ authHooks.associateCurrentUser({ idField: 'id', as: 'userId' }) ],
    update: [],
    patch: [],
    remove: []
    // !end
  },

  after: {
    // !code: after
    all: [ protect('user.password') ],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
    // !end
  },

  error: {
    // !<DEFAULT> code: error
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
    // !end
  },
  // !code: moduleExports // !end
};

// !code: exports // !end
module.exports = moduleExports;

// !code: funcs // !end
// !code: end // !end
