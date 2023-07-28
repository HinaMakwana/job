/**
 * Policy Mappings
 * (sails.config.policies)
 *
 * Policies are simple functions which run **before** your actions.
 *
 * For more information on configuring policies, check out:
 * https://sailsjs.com/docs/concepts/policies
 */

module.exports.policies = {

  /***************************************************************************
  *                                                                          *
  * Default policy for all controllers and actions, unless overridden.       *
  * (`true` allows public access)                                            *
  *                                                                          *
  ***************************************************************************/

  // '*': true,
  UserController : {
    logout : 'isAuthorized',
    myProfile : 'isAuthorized',
    uploadImage : 'isAuthorized',
    updateProfile  : 'isAuthorized',
    addEducation : 'isAuthorized',
    listSavedPost : 'isAuthorized'
  },
  JobController : {
    listAllJob:true,
    '*' : 'isAuthorized'
  },
  LikeController : {
    '*' : 'isAuthorized',
    test:true
  },
  ProfileController : {
    '*' : 'isAuthorized'
  }

};
