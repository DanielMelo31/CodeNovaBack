import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';

dotenv.config({ path: './.env' });

const stringConnection = process.env.DATABASE_URL;

const client = new MongoClient(stringConnection, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
});

let database;

const connectDB = (callback) => {
	client.connect((err, db) => {
		if (err) {
			console.error('Error while connecting');
			return 'err';
		}

		database = db.db('CodeNova');
		console.log('Connection succesfully');
		return callback();
	});
};

const getDB = () => {
    return database
}
export { connectDB, getDB };
