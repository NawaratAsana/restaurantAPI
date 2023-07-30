
const { json } = require('express');
const express = require('express');
const { default: mongoose } = require('mongoose');
const routes = require('./routes/routes');

const app = express();


app.use(json());

require('dotenv').config();

const { API_PORT } = process.env;
const port = process.env.PORT || API_PORT;


app.use(routes);
const { DATABASE_URL } = process.env

  
mongoose.connect(DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => {
        console.log("Database connect");
    })
    .catch((error) => {
        // console.log(error)
        console.log("Error connecting to MongoDB:",error);
    })

  app.listen(port, () => {
    console.log(`Server Started at ${port}`)
});
