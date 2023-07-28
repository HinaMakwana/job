/**
 * MoreInfo.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {

    Headline : {
      type: 'string',
      required: true
    },
    Skill : {
      type : 'json'
    },
    Location : {
      type : 'string'
    },
    //one-to-one relation
    user : {
      model : 'user'
    }

  },

};
