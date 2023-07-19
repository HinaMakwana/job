/**
 * UserController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

const { lazy } = require("react");


const id = sails.config.custom;
const bcrypt = sails.config.custom.bcrypt;
const jwt = sails.config.custom.jwt;
const Statuscode = sails.config.constant.HttpStatusCode;
const message = sails.config.getMessage
module.exports = {
    /**
     * @description register user in database
     * @route (POST /user/signup)
     */
    signup: async (req,res) => {
        try {
            let lang = req.getLocale();
            let { firstName,lastName, email, password, confirmPassword, role } = req.body
            let result = User.ValidationBeforeCreate({firstName,lastName,email,password,confirmPassword,role})
            if(result.hasError) {
                return res.status(Statuscode.BAD_REQUEST).json({
                    message : message("Validation",lang),
                    errors : result
                })
            }
            let findUser = await User.findOne({email : email,isDeleted: false})
            if(findUser){
                return res.status(Statuscode.CONFLICT).json({
                    status: Statuscode.CONFLICT,
                    message: message("User.Exist",lang)
                })
            }
            const pass = await bcrypt.hash(password, 10)
            if(!pass) {
                return res.status(Statuscode.SERVER_ERROR).json({
                    status: Statuscode.SERVER_ERROR,
                    message: message("ServerError",lang)
                })
            }
            const data = {
                id : id.uuid(),
                firstName : firstName,
                lastName: lastName,
                email : email,
                password : pass,
                role : role
            }
            const createUser = await User.create(data).fetch()
            // await sails.helpers.sendMail(email,firstName)
            return res.status(Statuscode.CREATED).json({
                message : message("User.Created",lang),
                User : createUser
            })
        } catch (error) {
            return res.status(Statuscode.SERVER_ERROR).json({
                status: Statuscode.SERVER_ERROR,
                message: message("ServerError",lang)
            })
        }
    },
    /**
     * @description login user
     * @route (POST /user/login)
     */
    login: async (req,res) => {
        let lang = req.getLocale();
        let {email, password} = req.body;
        try {
            let findUser = await User.findOne({
                email: email,
                isDeleted: false
            })
            if(!findUser) {
                return res.status(Statuscode.NOT_FOUND).json({
                    status:Statuscode.NOT_FOUND,
                    message: message("User.InvalidEmail",lang)
                })
            }
            const isCompare = await bcrypt.compare(password,findUser.password)
            if(isCompare === false) {
                return res.status(Statuscode.FORBIDDEN).json({
                    status: Statuscode.FORBIDDEN,
                    message: message("User.Invalid",lang)
                })
            }
            const token = jwt.sign(
                {
                    email: findUser.email,
                    userId: findUser.id
                },
                process.env.JWT_KEY,
                {
                    expiresIn: "8h"
                }
            )
            await User.update({email:findUser.email},{token: token})
            return res.status(Statuscode.OK).json({
                status: Statuscode.OK,
                message: message("User.Login",lang),
                token: token,
                role: findUser.role
            })
        } catch (error) {
            return res.status(Statuscode.SERVER_ERROR).json({
                status: Statuscode.SERVER_ERROR,
                message: message("ServerError",lang)
            })
        }
    },
    /**
     * @description Logout user
     * @route (POST /user/logout)
     */
    logout: async (req,res) => {
        try {
            let lang = req.getLocale();
            const userId =  req.userData.userId;
            const findUser = await User.findOne({id: userId,isDeleted: false})
            if(!findUser) {
                return res.status(Statuscode.NOT_FOUND).json({
                    status: Statuscode.NOT_FOUND,
                    message: message("User.UserNotFound",lang)
                })
            }
            const logoutUser = await User.update({id:userId},{token:null}).fetch()
            if(logoutUser){
                return res.status(Statuscode.OK).json({
                    status: Statuscode.OK,
                    message: message("User.Logout",lang)
                })
            } else {
                return res.status(Statuscode.SERVER_ERROR).json({
                    status: Statuscode.SERVER_ERROR,
                    message: message("ServerError",lang)
                })
            }
        } catch (error) {
            return res.status(Statuscode.SERVER_ERROR).json({
                status: Statuscode.SERVER_ERROR,
                message: message("ServerError",lang)
            })
        }
    },
    /**
     * @description see profile of user
     * @route (GET /user/profile)
     */
    profile: async (req,res) => {
        const userId = req.userData.userId;
        let lang = req.getLocale();
        try {
            const user = await sails.helpers.commonFun(userId);
            res.status(Statuscode.OK).json({
                status: Statuscode.OK,
                user: user
            })
        } catch (error) {
            return res.status(Statuscode.SERVER_ERROR).json({
                status: Statuscode.SERVER_ERROR,
                message: message("ServerError",lang)
            })
        }
    },
    /**
     * @description upload profile picture
     * @route (POST /user/uploadImage)
     */
    uploadImage: async (req,res) => {
        const userId = req.userData.userId;
        let lang = req.getLocale();
        try {
            const findUser = await User.findOne({id: userId})
            if(!findUser) {
                return res.status(Statuscode.NOT_FOUND).json({
                    status: Statuscode.NOT_FOUND,
                    message: message("User.UserNotFound",lang)
                })
            }
            let fileUpload = await sails.helpers.uploadImage(req,'image',`profile/${findUser.firstName}`)
            if (fileUpload.type.includes('image/')) {
                fileUpload = fileUpload.fd;
            } else {
                return res.status(Statuscode.UNAUTHORIZED).json({
                    status: Statuscode.UNAUTHORIZED,
                    message : message("User.Upload",lang)
                })
            }
            let upload = await User.update({id : userId},{imageUrl : fileUpload}).fetch()
            if(upload) {
                return res.status(Statuscode.OK).json({
                    status: Statuscode.OK,
                    message: message("User.Uploaded",lang)
                })
            } else {
                return res.status(Statuscode.SERVER_ERROR).json({
                    status: Statuscode.SERVER_ERROR,
                    message: message("ServerError",lang)
                })
            }
        } catch (error) {
            return res.status(Statuscode.SERVER_ERROR).json({
                status: Statuscode.SERVER_ERROR,
                message: message("ServerError",lang)
            })
        }
    }
}
