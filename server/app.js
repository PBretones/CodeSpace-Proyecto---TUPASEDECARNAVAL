require("./config/config");
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const expressValidator = require('express-validator')


const app = express();
app.use(express.json())
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use(expressValidator())

app.use("/api", require('./routes/modalidadRoutes'))
app.use("/api", require('./routes/tipoRoutes'))
app.use("/api", require('./routes/audioRoutes'))
app.use("/api", require('./routes/authorRoutes'))
app.use("/api", require('./routes/newsRoutes'))
app.use("/api", require('./routes/userRoutes'))

mongoose.connect('mongodb://localhost:27017/tpdc', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: true,
    useCreateIndex: true
})


mongoose.connection.on('error', error => {
    console.log(error);
})

mongoose.connection.once('open', () => {
    console.log("CONECTAO");
})



app.listen(3002, () => {
    console.log("SERVER READY");
})