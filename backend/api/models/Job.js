/**
 * Job.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */
const workType = sails.config.constant.WorkType
const jobType = sails.config.constant.jobType
module.exports = {

  attributes: {

    id: {
      type: 'string',
      required: true
    },
    title: {
      type: 'string',
      required: true,
      unique: true
    },
    company: {
      type: 'string',
      required: true
    },
    workplaceType: {
      type: 'string',
      isIn: [workType.home,workType.office]
    },
    jobLocation: {
      type: 'string',
      required: true
    },
    jobType: {
      type: 'string',
      required: true,
      isIn : [jobType.ft,jobType.pt,jobType.contract]
    },
    postedBy: {
      model: 'user'
    },
    description: {
      type: 'string',
      required: true
    },
    isDeleted: {
      type: 'boolean',
      defaultsTo: false
    }

  },

};
