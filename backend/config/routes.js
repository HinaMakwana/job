/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes tell Sails what to do each time it receives a request.
 *
 * For more information on configuring custom routes, check out:
 * https://sailsjs.com/anatomy/config/routes-js
 */

module.exports.routes = {
    //userController routes
    'POST /user/signup' : 'UserController.signup',
    'POST /user/login' : 'UserController.login',
    'POST /user/logout' : 'UserController.logout',
    'GET /user/profile' : 'UserController.profile',
    'POST /user/uploadImage' : 'UserController.uploadImage',

    //jobController routes
    'POST /job/post' : 'JobController.post',
    'PATCH /job/update' : 'JobController.updateJob',
    'DELETE /job/delete' : 'JobController.deleteJob',
    'GET /job' : 'JobController.listAllJob',
    'GET /job/list' : 'JobController.listJob'
};
