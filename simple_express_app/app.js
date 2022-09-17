// Importing Express.js
const express = require('express');

// To set file path
const path = require('path');

// To do "patch"/"delete" requests direcly from form elements
const methodOverride = require('method-override');

// For generating Unique ID's
const { v4: uuid } = require('uuid');

const app = express();

// To parse form data in POST req body
app.use(express.urlencoded({ extended: true }));
// To parse incoming JSON in POST request body:
app.use(express.json());
// For fake post ops
app.use(methodOverride('_method'));
// Set path for "views" folder
app.set('views', path.join(__dirname, '/views'));
// Setting view engine to EJS
app.set('view engine', 'ejs');

// Static files
app.use(express.static(path.join(__dirname, '/public')))


// allTweets
let allTweets = [

];


// ------------------------------------------------
// HOME PAGE

app.get('/', (req, res) => {
    let rgb = 'aquamarine';
    let text = 'HOME PAGE 🏠';
    res.render('index', { rgb, text });
});

// ------------------------------------------------
// UGLY TWEETS HOME

app.get('/uglytweets', (req, res) => {
    res.render('uglytweets', { allTweets });
});

// Create a new tweet
app.get('/uglytweets/newtweet', (req, res) => {
    res.render('newtweet');
});

// Post tweet
app.post('/uglytweets', (req, res) => {
    const { username, tweet } = req.body;
    allTweets.push({ username, tweet, id: uuid() })
    res.redirect('uglytweets');
})

// Show individual tweet
app.get('/uglytweets/:id', (req, res) => {
    const { id } = req.params;
    const theTweet = allTweets.find(each => each.id === id);
    res.render('showeach', { theTweet })
})

// Delete tweet
app.delete('/uglytweets/:id', (req, res) => {
    const { id } = req.params;
    allTweets = allTweets.filter(each => each.id !== id);
    res.redirect('/uglytweets');
})

// Edit tweet
app.get('/uglytweets/:id/edit', (req, res) => {
    const { id } = req.params;
    const eachTweet = allTweets.find(each => each.id === id);
    res.render('edittweet', { eachTweet })
})


// Post the edit
app.patch('/uglytweets/:id', (req, res) => {
    const { id } = req.params;
    const theTweet = allTweets.find(each => each.id === id);
    const newTweetText = req.body.tweet;
    theTweet.tweet = newTweetText;
    res.redirect('/uglytweets');
})

// ------------------------------------------------
// RANDOM NUMBER GENERATOR

app.get('/random', (req, res) => {
    const randomNumber = Math.ceil(Math.random() * 100);
    res.render('random', { randomNumber });
});

// ------------------------------------------------
// RANDOM BODY COLOUR GENERATOR

app.get('/colorful', (req, res) => {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    let rgb = `rgb(${r}, ${g}, ${b})`;
    let text = 'Welcome to the colourful page.! 😎';
    res.render('index', { rgb, text });
});

// ------------------------------------------------
// 404 PAGE

app.get('*', (req, res) => {
    res.render('404');
});

// ------------------------------------------------

app.listen(3000, () => {
    console.log("LISTENING ON PORT 3000")
});