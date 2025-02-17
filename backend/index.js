const express = require('express');
const cors = require('cors');

require('./models/config');
require('./models/Food')

const app = express();
app.use(express.json());
app.use(cors());
const PORT = process.env.PORT || 5000

app.use('/api/products', require('./routes/products'));

app.listen(PORT,()=>{
    console.log("Connected to http://localhost:5000");
})
