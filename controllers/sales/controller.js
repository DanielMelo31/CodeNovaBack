import { getDB } from '../../db/db.js';

const allSalesQueries = async (callback) => {
	const connection = getDB();
	await connection.collection('sales').find().limit(50).toArray(callback);
};

const newSale = async (saleData, callback) => {
	console.log('Keys: ', Object.keys(saleData));

	const connection = getDB();

	connection.collection('sales').insertOne(saleData, callback);
};
export { allSalesQueries, newSale };
