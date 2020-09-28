const Express = require('express');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const path = require('path');

const app = Express();

app.use(bodyParser.urlencoded({ extended: false }));

dotenv.config({ path: 'config.env' });

const authenticationRoutes = require('./routes/authenticationRoutes');
const adminRoutes = require('./routes/adminRoutes');
app.use(authenticationRoutes);
app.use(adminRoutes);

app.set('view engine', 'ejs');
app.set('views', 'views');
app.use(Express.static(path.join(__dirname, 'public', 'css')));

const port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log(`Listening to request on port ${port}`);
});
