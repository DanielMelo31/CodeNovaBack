import Express from 'express';
import { allSalesQueries, newSale } from '../../controllers/sales/controller.js';
import { getDB } from '../../db/db.js';

const salesRoutes = Express.Router();

const genericCallback = (res) => (err, result) => {
	if (err) {
		console.log(err);
		res.status(500).send('Opps an error ocurred while getting data');
	} else {
		res.json(result);
	}
}

salesRoutes.route('/sales').get((req, res) => {
	const connection = getDB();

	allSalesQueries(genericCallback(res));
});

salesRoutes.route('/sales/update').patch((req, res) => {
	const edit = req.body;
	console.log(edit);

	const saleFilter = { _id: new ObjectId(edit.id) };
	delete edit.id;
	const operation = {
		$set: edit,
	};
	allSalesQueries();
});

salesRoutes.route('/sales/new').post((req, res) => {
	newSale(req.body, genericCallback(res))
});

export default salesRoutes;
