'use strict';

const uniCurd = require('uni-curd')
const db = uniCloud.database()
const dbCmd = db.command

exports.main = async (event, context) => {
	//event为客户端上传的参数
	console.log('event : ', event)
	
	try {
		const result = await uniCurd({
			command: event.command,
			pagination: event.pagination,
			rules: {
				articles: {
					create: true,
					read: true,
					update: true,
					delete: true,
					hooks: {}
				}
			}
		})
		return {
			code: 0,
			...result
		}
	
	} catch (e) {
		return {
			code: 500,
			msg: e.message
		}
	}
	
};
