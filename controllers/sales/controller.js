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
const editSale = async (ObjectID, editObject, callback) => {
	console.log(editObject);

	const saleFilter = { _id: new ObjectId(ObjectID) };
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

const deleteSale = async (deleteObject, callback) => {
	const saleFilter = { _id: new ObjectId(deleteObject) };
	const database = getDB();

	await database.collection('sales').deleteOne(saleFilter, callback);
};
export { allSalesQueries, newSale, editSale, deleteSale };
