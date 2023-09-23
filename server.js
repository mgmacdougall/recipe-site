require('dotenv').config();
const path = require('path');
const data = require('./src/data/source.data'); // Temp data
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const routes = require('./src/routes/Routes.js');

const app = express();
const PORT = process.env.SERVER_PORT || 5000;
app.use('/static', express.static(path.join(__dirname, 'src', 'public')));

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(cors());

app.get('/', (req, res) => res.json({message: 'Ok'}));
// app.use("/", routes);

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
