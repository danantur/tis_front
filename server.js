const express = require('express');
const bodyParser = require('body-parser');
const FakeDB = require('fake-db');
const app = express();
const port = process.env.PORT || 3001;
var cors = require('cors')
const swaggerUi = require('swagger-ui-express');
const swaggerJSDoc = require('swagger-jsdoc');
const SwaggegDoc = require('./SwaggegDoc.json');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors())
const options = {
	definition: {
		openapi: '3.0.0',
		info: {
			title: 'server API',
			version: '1.0.0',
		},
		basePath: '/',
		...SwaggegDoc,
	},
	apis: ['./server.js'], // files containing annotations as above
};
// const swaggerSpec = swaggerJSDoc(options);
// app.use('/api', swaggerUi.serve, swaggerUi.setup(swaggerSpec)); //

let todoList = [
	{
		id: 1,
		todo: 'Сдать практику',
		chek: false,
	},
	{
		id: 2,
		todo: 'Получить оценку',
		chek: false,
	},
	{
		id: 3,
		todo: 'Жить спокойно',
		chek: false,
	},
];
var db = new FakeDB(todoList);

app.use(express.static(__dirname + '/frontend'));

app.get('/todos', (req, res) => {
	res.sendFile("frontend/index.html", { root: '.' })
});

app.get('/api/todos', (req, res) => {
	db.getCollection()
		.then((collection) => {
			res.status(200).json({
				success: true,
				collection,
			});
		})
		.catch((error) =>
			res.status(404).json({
				success: false,
				error: error.message,
			}),
		);
});

app.get('/api/todos/:id', (req, res) => {
	db.getItem(req.params.id)
		.then((collection) => {
			res.status(200).json({
				success: true,
				collection,
			});
		})
		.catch((error) =>
			res.status(404).json({
				success: false,
				error: error.message,
			}),
		);
});

// POST /api/todos
app.post('/api/todos', (req, res) => {
	if (!req.body || !req.body.todo || !req.body.chek) {
		res.status(404).json({
			success: false,
			error: 'Тело запроса пустое',
		});
		return;
	}

	const prevId = todoList.reduce((prev, curr) => {
		return prev > curr.id ? prev : curr.id;
	}, 0);
	const newTodo = {
		id: prevId + 1,
		todo: req.body.todo,
	};
	db.setItem(prevId + 1, newTodo)
		.then((collection) => {
			res.status(200).json({
				success: true,
				collection,
			});
		})
		.catch((error) =>
			res.status(404).json({
				success: false,
				error: error.message,
			}),
		);
	// res.json(newTodo);
});

// PUT /api/todos/:id
app.put('/api/todos/:id', (req, res) => {
	if (!req.body || !req.body.todo || !req.body.chek) {
		res.status(404).json({
			success: false,
			error: 'Тело запроса пустое',
		});
		return;
	}

	const newTodo = {
		id: req.params.id,
		todo: req.body.todo,
		chek: req.body.chek,
	};
	db.setItem(req.params.id, newTodo)
		.then(() => {
			res.status(200).json({
				success: true,
			});
		})
		.catch((error) =>
			res.status(404).json({
				success: false,
				error: error.message,
			}),
		);
});

// DELETE /api/todos/:id
app.delete('/api/todos/:id', (req, res) => {
	db.removeItem(req.params.id)
		.then(() => {
			db.getCollection()
				.then((collection) => {
					res.status(200).json({
						success: true,
						collection,
					});
				})
				.catch((error) =>
					res.status(404).json({
						success: false,
						error: error.message,
					}),
				);
		})
		.catch((error) =>
			res.status(404).json({
				success: false,
				error: error.message,
			}),
		);
});

app.listen(port, () => {
	console.log('\x1b[35m%s\x1b[0m', `The server is running on the port ${port}`);
	console.log('\x1b[32m%s\x1b[0m', `http://localhost:${port}/`);
});
