import express from 'express';
const app = express();
const port = 3000;

// get the request from the browser and sends back response
app.get('/', (req, res) => {
    res.send('Hello World'); 
});

app.get('/about', (req, res) => {
    res.send('About Us');
});

app.get("/family", (req, res) => {
    res.send("Family");
});

// listen to the port
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});