const userTypeDefs = require('./user/schema');
const userResolvers = require('./user/resolvers');
const medicationTypeDefs = require('./medications/schema');
const medicationResolvers = require('./medications/resolvers');
//buradan apollo.js e export edecem,mongodb araştırmaya bak az



   module.exports = {userTypeDefs, userResolvers, medicationTypeDefs ,medicationResolvers};
   

 