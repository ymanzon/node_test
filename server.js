require('dotenv').config();

const express = require('express');
const morgan = require('morgan');

//const startUp = require('./startup')

const app = express();
const authRoutes = require('./routes/route');
const productsRoute = require('./routes/products-route'); //*
const brandsRoute = require('./routes/brands-route'); //*
const usersRoute = require('./routes/users-route');
//const photosRoute = require('./routes/photos-route');
const inventoryRoute = require('./routes/inventory-route');
const customerRoute = require('./routes/customer-route');
const salesOrderRoute = require('./routes/sales-orders-route');

const providerRoute = require('./routes/provider-route');
const purchasesOrdersRoute = require('./routes/purchases-orders-route');

const { swaggerUi, specs } = require('./config/swagger');

app.use(morgan('dev'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use('/api/auth', authRoutes);

app.use('/api/products', productsRoute);
app.use('/api/brands', brandsRoute);
app.use('/api/users', usersRoute);
app.use('/api/inventory', inventoryRoute);
app.use('/api/customers', customerRoute);

app.use('/api/sales-orders', salesOrderRoute);
app.use('/api/purchases-orders', purchasesOrdersRoute);

app.use('/api/providers', providerRoute);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
