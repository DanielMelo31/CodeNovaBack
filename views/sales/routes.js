import Express from 'express';
import {
	allSalesQueries,
	deleteSale,
	editSale,
	newSale,
} from '../../controllers/sales/controller.js';
import { getDB } from '../../db/db.js';

const salesRoutes = Express.Router();

const genericCallback = (res) => (err, result) => {
	if (err) {
		console.log(err);
		res.status(500).send('Opps an error ocurred while getting data');
	} else {
		res.json(result);
	}
};

salesRoutes.route('/sales').get((req, res) => {
	const connection = getDB();

	allSalesQueries(genericCallback(res));
});

salesRoutes.route('/sales').post((req, res) => {
	newSale(req.body, genericCallback(res));
});

salesRoutes.route('/sales/:id').patch((req, res) => {
	editSale(req.params.id,req.body, genericCallback(res));
});

salesRoutes.route('/sales/:id').delete((req, res) => {
	deleteSale(req.params.id, genericCallback(res));
});
export default salesRoutes;
