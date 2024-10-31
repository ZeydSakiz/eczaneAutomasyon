const userTypeDefs = require('./user/schema');
const userResolvers = require('./user/resolvers');
const medicationTypeDefs = require('./medications/schema');
const medicationResolvers = require('./medications/resolvers');
const user_medicationTypeDefs= require('./user_medication/schema');
const user_medicationResolvers=require('./user_medication/resolvers');




   module.exports = {userTypeDefs, userResolvers, medicationTypeDefs ,medicationResolvers, user_medicationTypeDefs, user_medicationResolvers};
   

 