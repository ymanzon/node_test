require('dotenv').config();

const express = require('express');
const morgan = require('morgan');

//const startUp = require('./startup')

const app = express();
const authRoutes = require('./routes/route');
const productsRoute = require('./routes/products-route'); //*
const brandsRoute = require('./routes/brands-route'); //*

const { swaggerUi, specs } = require('./config/swagger');

app.use(morgan('dev'));
app.use(express.json());
app.use('/api/auth', authRoutes);

app.use('/api/products', productsRoute);
app.use('/api/brands', brandsRoute);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
