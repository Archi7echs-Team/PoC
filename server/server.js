import postgres from 'postgres';
import express from 'express';
import cors from 'cors';
const app = express();
app.use(cors());
app.use(express.json());
const port = 3000;
const sql = postgres({
	host: 'localhost',
	port: 5432,
	database: 'data',
	username: 'admin',
	password: 'test'
});

async function loadApi() {
	await sql.begin(async (sql) => {
		const res = await fetch('https://api.nationalize.io/?name=nathaniel').then((r) => r.json());

		const data = res.country.map((row, i) => ({
			x: 5 * i,
			y: Math.floor(row.probability * 100),
			z: 0
		}));

		await sql`DELETE FROM api`;
		for (const row of data)
			await sql`INSERT INTO api(x, y, z) VALUES (${row.x}, ${row.y}, ${row.z})`;
	});
}

setInterval(loadApi, 60 * 1000);
loadApi();

app.get('/', async (req, res) => {
	const data = await sql`SELECT x,y,z FROM data`;
	const api = await sql`SELECT x,y,z FROM api`;
	res.send(JSON.stringify({ data, api }));
});

app.listen(port, () => {
	console.log(`App listening on port ${port}`);
});
