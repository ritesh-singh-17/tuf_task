const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require('cookie-parser');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes')
const bannerRoutes = require('./routes/bannerRoutes');

require("dotenv").config();

const app = express();

app.use(cookieParser());
app.use(cors());
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

//routes
app.use('/api/auth', authRoutes);
app.use('/api/banner', bannerRoutes);

// Serve uploaded files
app.use('/uploads', express.static('uploads'));

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server started on ${port}`);
});
