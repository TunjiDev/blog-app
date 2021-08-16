const express = require('express');
const dotenv = require('dotenv');

dotenv.config();
const app = express();


const mongoose = require('mongoose');
const blogRoutes = require('./routes/blogRoutes');
// const morgan = require('morgan');

const port = process.env.PORT || 9091;
const DB = process.env.DATABASE.replace('<PASSWORD>', process.env.DATABASE_PASSWORD);

const connectToDB = async() => {
    try {
        await mongoose.connect(DB, {
            useUnifiedTopology: true,
            useNewUrlParser: true,
            useCreateIndex: true,
            useFindAndModify: false
        });

        app.listen(port, () => {
            console.log(`App is running on port ${port} and Database connected!`);
        })
    } catch (error) {
        console.log(error);
    }
};
connectToDB();

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(express.urlencoded({extended: true}));

app.use(express.json());
// app.use(morgan('dev'));

app.use((req, res, next) => {
    res.locals.path = req.path;
    next();
  });
//routes
app.get('/', (req, res) => {
    res.redirect('/blogs');
});

app.get('/contact', (req, res) => {
    res.render('contact', {title: 'Contact'});
});

app.get('/about', (req, res) => {
    res.render('about', {title: 'About Us'});
});

app.get('/create', (req, res) => {
    res.render('create', {title: 'Create Blog'});
});

//Blog routes
app.use('/blogs', blogRoutes);

//Use middleware to render error page
app.use((req, res) => {
    res.status(404).render('404', {title: '404 Error'});
});