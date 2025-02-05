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
		//const res = await fetch('https://api.nationalize.io/?name=nathaniel').then((r) => r.json());
		const res = {country: [{country_id: "US", probability: 0.2}, {country_id: "CA", probability: 0.15}, {country_id: "MX", probability: 0.2}]};
		const data = res.country.map((row, i) => ({
			x: 5 * i,
			y: Math.floor(row.probability * 50),
			z: 0
		}));

		await sql`DELETE FROM api`;
		for (const row of data)
			await sql`INSERT INTO api(x, y, z) VALUES (${row.x}, ${row.y}, ${row.z})`;
	});
}

loadApi();

app.get('/', async (req, res) => {
	const data = await sql`SELECT x,y,z FROM data`;
	const api = await sql`SELECT x,y,z FROM api`;
	const x_label = await sql`SELECT x, label FROM data_labels_x`;
	const z_label = await sql`SELECT z, label FROM data_labels_z`;
	res.send(JSON.stringify({ data, x_label, z_label, api }));
});

app.listen(port, () => {
	console.log(`App listening on port ${port}`);
});
