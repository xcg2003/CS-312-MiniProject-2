// Import the express module
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import axios from 'axios';
import ejs from 'ejs';

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
app.set('views', path.join(__dirname, 'views'));


// Start the server
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
    res.status(200);
});

app.post('/', async (req, res) => {
    try {
        const response = await axios.get('https://www.thecocktaildb.com/api/json/v1/1/random.php');
        const cocktailData = encodeURIComponent(JSON.stringify(response.data));
        res.redirect(`/displayCocktail?data=${cocktailData}`);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error fetching cocktail data');
    }
});

app.get('/displayCocktail', (req, res) => {
    try {
        const data = JSON.parse(decodeURIComponent(req.query.data));
        res.render('displayCocktail', { cocktail: data });
        res.status(200);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error processing cocktail data');
    }
});

app.listen(port, () => {
    console.log(`Server started on http://localhost:${port}`);
});