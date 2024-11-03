const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const ShortUrl = require('./models/shortUrl');

const app = express();

mongoose.connect('mongodb://localhost/url-shortener', {
    useNewUrlParser: true, useUnifiedTopology: true
});

app.set('view engine', 'ejs');
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/js', express.static(path.join(__dirname, 'js')));

app.get('/', async (req, res) => {
    const shortUrls = await ShortUrl.find();
    res.render('index', { shortUrls: shortUrls });
});

app.post('/shortUrls', async (req, res) => {
    const { fullUrl } = req.body;
    const shortUrl = await ShortUrl.create({ full: fullUrl });
    res.json({ short: shortUrl.short });
});

app.get('/:shortUrl', async (req, res) => {
    const shortUrl = await ShortUrl.findOne({ short: req.params.shortUrl });
    if (shortUrl == null) return res.sendStatus(404);
    res.redirect(shortUrl.full);
});

app.listen(process.env.PORT || 5000);
