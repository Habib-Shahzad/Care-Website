const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');
require('dotenv').config();

const app = express();
const port = parseInt(process.env.PORT);


const createServer = async () => {

    console.log("Server is saying Hello!");

    mongoose
        .connect(process.env.DATABASE_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        .then(() => {
            console.log("Successfully connected to database", process.env.DATABASE_NAME);
        })
        .catch((error) => {
            console.log("database connection failed. exiting now...");
            console.error(error);
            process.exit(1);
        });

    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json());
    app.use(cookieParser(process.env.COOKIE_SECRET));

    let corsOptions = [process.env.API_URL3];

    if (process.env.NODE_ENV === 'development') {
        corsOptions.push(process.env.API_URL2);
        corsOptions.push(process.env.API_URL1);
    }

    app.use(cors({
        credentials: true,
        origin: corsOptions
    }));

    app.use(express.static('./build'));

    const blogRoutes = require('./routes/blog');
    app.use('/api/blog', blogRoutes);

    const activityRoutes = require('./routes/activity');
    app.use('/api/actvity', activityRoutes);

    app.get('*', function (req, res) {
        res.sendFile(path.resolve('./build/index.html'));
    });

    app.listen(port, () => {
        console.log(`Example app listening at http://localhost:${port}`);
    });
}

createServer();
