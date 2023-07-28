const { table } = require("console");
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
			//get all data of users omit token and password
			/* let query = `SELECT "firstName","lastName","email","moreData","role","createdAt"
			 FROM "user"
			 WHERE "role"='client' AND "moreData" IS NULL
			 ORDER BY "createdAt" DESC , "moreData" NULLS LAST` */
			//join moreinfo and user table
			/* let query = `SELECT
				"firstName",
				"lastName","email","moreData","role","user"."createdAt",
				"moreinfo"."Headline",
				"moreinfo"."Location",
				"moreinfo"."Skill"
				FROM "user"
				FULL JOIN moreinfo
				ON "user"."moreData"="moreinfo"."id"
				WHERE "role"='client'
				ORDER BY "createdAt" DESC , "moreData" NULLS LAST` */
			//find particular user's moreData and Education details and count of liked post by this user
			let id = req.query.id;
			console.log(id);
			let query = `SELECT "u"."id","u"."firstName",
				"u"."lastName","u"."email","e"."educationType","e"."instituteName","e"."year",
				"e"."id","m"."id",
				"m"."Headline","m"."Location","m"."Skill",
				COUNT("l"."likedPost") AS likeByUser
				FROM "user" AS "u"
				LEFT JOIN "education" AS "e"
				ON "u"."id"="e"."userData"
				LEFT JOIN "moreinfo" AS "m"
				ON "u"."id"="m"."user"
				LEFT JOIN "like" AS "l"
				ON "u"."id"="l"."clients"
				WHERE "u"."id"='${id}' AND "u"."role"='client'
				GROUP BY "u"."id","e"."id","m"."id"`
			// let query = `SELECT "j"."id", "l"."likedPost"
			// FROM job AS j
			// INNER JOIN "like" AS "l"
			// ON "j"."id"="l"."likedPost"`;
			let run = await sails.sendNativeQuery(query,[])
			return res.status(200).json({
				data:run
			});
		} catch (error) {
			return res.status(500).json({
				message : 'server error' + error,
				error: error
			});
		}
	}

};
