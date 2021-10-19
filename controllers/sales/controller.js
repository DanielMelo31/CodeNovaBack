import { getDB } from '../../db/db.js';
import { ObjectId } from 'mongodb';

const allSalesQueries = async (callback) => {
	const connection = getDB();
	await connection.collection('sales').find().limit(50).toArray(callback);
};

const newSale = async (saleData, callback) => {
	console.log('Keys: ', Object.keys(saleData));

	const connection = getDB();

	await connection.collection('sales').insertOne(saleData, callback);
};

const editSale = async (editObject, callback) => {
	console.log(editObject);

	const saleFilter = { _id: new ObjectId(editObject.id) };
	delete editObject.id;
	const operation = {
		$set: editObject,
	};
	const database = getDB();

	await database.collection('sales').findOneAndUpdate(
		saleFilter,
		operation,
		{
			upsert: true,
			returnOriginal: true,
		},
		callback
	);
};
export { allSalesQueries, newSale, editSale };
