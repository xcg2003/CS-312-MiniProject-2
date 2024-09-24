// Import the express module
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import axios from 'axios';

const app = express();
const port = 3000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Middle ware to parse the json data
app.use(express.json());``

// Middleware to parse URL-encoded form data
app.use(express.urlencoded({ extended: true }));

// Set the view engine to ejs
app.set('view engine', 'ejs');


// Start the server
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
    res.status(200);
});

app.post('/', async (req, res) => {
    await axios.get('https://www.thecocktaildb.com/api/json/v1/1/random.php')
    .then(response => {
        console.log(response.data);
    });
   
});

app.listen(port, () => {
    console.log(`Server started on http://localhost:${port}`);
});