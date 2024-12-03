const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const PORT = process.eventNames.PORT || 5000;
app.use(express.json());
//Middleware 
app.use(cors({
    origin: 'https://brio-ai.vercel.app', // Remove trailing slash
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
}));



//connect to mongoDB 
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log('MongoDB Connected'))
.catch((err) => console.log(err));

//Routes
app.use('/api/auth', require('./routes/authRoutes'));

app.listen(PORT, () => {
    console.log(`Server is up and running ${PORT}`);
});