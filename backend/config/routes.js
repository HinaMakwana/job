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
    'GET /user/profile' : 'UserController.myProfile',
    'GET /user/:id' : 'UserController.profile',
    'GET /list/users' : 'UserController.listAllUsers',
    'POST /add/education' : 'UserController.addEducation',
    'POST /add/moreInfo/:id' : 'UserController.addMoreInfo',
    'PATCH /update/profile' : 'UserController.updateProfile',
    'GET /list' : 'UserController.listSavedPost',
    'PATCH /forgetPass' : 'UserController.forgetPassword',
    'PATCH /resetPass' : 'UserController.resetPassword',
    'PATCH /changePass' : 'UserController.changePassword',
    'GET /' : 'UserController.getMessage',

    //profileController routes
    'POST /uploadImage' : 'ProfileController.changeProfilePic',
    'PATCH /removePhoto' : 'ProfileController.removeProfilePhoto',

    //jobController routes
    'POST /job/post' : 'JobController.post',
    'PATCH /job/update' : 'JobController.updateJob',
    'DELETE /job/delete' : 'JobController.deleteJob',
    'GET /job' : 'JobController.listAllJob',
    'GET /job/list' : 'JobController.listJob',
    'POST /job/search' : 'JobController.searchJob',
    'GET /job/listone/:id' : 'JobController.listOne',
    'POST /apply' : 'JobController.applyJob',

    //LikeController routes
    'POST /like/:id' : 'LikeController.likeUnlike',
    'POST /test' : 'LikeController.test',

    //savePost routes
    'POST /save/post' : 'SavePostController.savePost',

};
