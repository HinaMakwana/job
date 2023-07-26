const { create } = require("domain");

/**
 * LikeController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */
const id = sails.config.custom;
const Statuscode = sails.config.constant.HttpStatusCode;
let message = sails.config.getMessage;

module.exports = {
	/**
	 * @description like and unlike post only by client
	 * @Route POST like/:id
	 */
	likeUnlike : async (req,res) => {
		const userId = req.userData.userId;
		let lang = req.getLocale();
		try {
			const user = await sails.helpers.commonFun(userId);
			if(user.role == 'client') {
				let postId = req.params.id
				let findUser = await User.findOne({id: userId})
				if(!findUser) {
					return res.status(Statuscode.NOT_FOUND).json({
						message: message('User.UserNotFoud',lang)
					})
				}
				let findPost = await Job.findOne({id: postId})
				if(!findPost) {
					return res.status(Statuscode.NOT_FOUND).json({
						message: message('Job.NotFound',lang)
					})
				}
				let findLike = await Like.findOne({clients: userId,likedPost:postId})
				if(findLike) {
					let destroyLike = await Like.destroy({clients:userId,likedPost:postId}).fetch()
					return res.status(Statuscode.OK).json({
						message : message('Unlike.Post',lang),
						data: destroyLike
					})
				} else {
					let data = {
						id: id.uuid(),
						clients : userId,
						likedPost : postId
					}
					let createLike = await Like.create(data).fetch()
					return res.status(Statuscode.CREATED).json({
						message: message('Like.Post',lang),
						data : createLike
					})
				}
			} else {
				return res.status(Statuscode.UNAUTHORIZED).json({
					status: Statuscode.UNAUTHORIZED,
					message: message('Unauthorized',lang)
				})
			}
		} catch (error) {
			return res.status(Statuscode.SERVER_ERROR).json({
				message: message('ServerError',lang) + error
			})
		}
	},
	test : async (req,res) => {
		try {
			let query = `SELECT "j"."id", "l"."likedPost"
			FROM job AS j
			INNER JOIN "like" AS "l"
			ON "j"."id"="l"."likedPost"`;
			let run = await sails.sendNativeQuery(query,[])
			return res.status(200).json({
				data:run
			})
		} catch (error) {
			return res.status(500).json({
				message : 'server error' + error,
				error: error
			})
		}
	}

};
