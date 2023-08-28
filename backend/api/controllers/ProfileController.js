/**
 * ProfileController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */
const Statuscode = sails.config.constant.HttpStatusCode;
const message = sails.config.getMessage;
const path = require('path');
const fs = require('node:fs');
const {imageType} = sails.config.constant;
const cloudinary = sails.config.constant.cloudinary;
module.exports = {

	/**
	 * @description upload image
	 * @param {Request} req
	 * @param {Response} res give uploadfile url in json format
	 * @route (POST /uploadImage)
	 */
	changeProfilePic : async (req,res) => {
		const userId = req.userData.userId;
		const lang = req.getLocale();
		try {
			let dirname = path.join(process.env.BASE_URL,'profile')
			if(!fs.existsSync(dirname)){
				fs.mkdirSync(dirname)
			}

			let filePath = req.file('image').upload(
				{
					adapter: require('skipper-disk'),
					maxBytes: 10000000,
					saveAs: function(file, cb) {
						 cb(null, file.filename);
					 },
					dirname: dirname
				},
				async (err,uploadedFiles) => {
					if(err) {
						console.log(err);
						return res.status(Statuscode.BAD_REQUEST).json({
							status: Statuscode(BAD_REQUEST),
							message: 'Bad request',
							error : err
						})
					}
					if(uploadedFiles.length === 0) {
						return res.status(Statuscode.BAD_REQUEST).json({
							status: Statuscode(BAD_REQUEST),
							message: 'No image uploaded'
						})
					}
					let fileType = uploadedFiles[0].type;
					if(!imageType.includes(fileType.toString())){
						return res.status(Statuscode.BAD_REQUEST).json({
							status: Statuscode(BAD_REQUEST),
							message: 'Image type is invalid'
						})
					}
					let mainUrl = await sails.helpers.uploadImage(uploadedFiles[0].fd)
					if(mainUrl.hasError) {
						return res.status(Statuscode.SERVER_ERROR).json({
							status: Statuscode.SERVER_ERROR,
							message: message('ServerError',lang),
							error: mainUrl.error
						})
					}
					let updateUrl = await User.update({id:userId},{imageUrl: mainUrl.data.url}).fetch()
					if(updateUrl) {
						return res.status(Statuscode.OK).json({
							status: Statuscode.OK,
							message: 'Profile picture uploaded successfully'
						})
					}
				}
			)
		} catch (error) {
			return res.status(Statuscode.SERVER_ERROR).json({
				message: message('ServerError',lang) + error
			})
		}
	},
	/**
	 * @description Delete profile photo
	 * @route (PATCH /removePhoto)
	 */
	removeProfilePhoto : async (req,res) => {
		const lang = req.getLocale();
		const userId = req.userData.userId;
		try {
			let user = await sails.helpers.commonFun(userId)
			if(user.imageUrl == null) {
				return res.status(Statuscode.BAD_REQUEST).json({
					status: Statuscode.BAD_REQUEST,
					message: 'Profle photo already deleted'
				})
			}
			let deletePhoto = await User.update({id:userId},{imageUrl:null}).fetch()
			// let imageName = user.imageUrl.split('/')[7].split('.')[0];
			let imageName = user.imageUrl.split('/');
			imageName = imageName[imageName.length - 1];
			imageName = imageName.split('.')[0];
			cloudinary.config({
				cloud_name:process.env.CLOUDINARY_CLOUD_NAME,
				api_key: process.env.CLOUDINARY_API_KEY,
				api_secret: process.env.CLOUDINARY_SECRET_KEY
			})

			await cloudinary.uploader.destroy(imageName,(err,result)=> {
				if(err) {
					console.log('error',err);
					return res.status(Statuscode.SERVER_ERROR).json({
						status: Statuscode.SERVER_ERROR,
						message: message('ServerError',lang) + error
					})
				}
				if(result) {
					console.log('result',result);
				}
			})
			if(deletePhoto) {
				return res.status(Statuscode.OK).json({
					status: Statuscode.OK,
					message: 'profile photo deleted successfully'
				})
			}
		} catch (error) {
			return res.status(Statuscode.SERVER_ERROR).json({
				status: Statuscode.SERVER_ERROR,
				message: message('ServerError',lang) + error
			})
		}
	}
};
