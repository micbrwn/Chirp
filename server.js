const path = require("path");
const express = require("express");
const session = require("express-session");
const exphbs = require("express-handlebars");
const routes = require("./controllers");
const helpers = require("./utils/helpers");
const sequelize = require("./config/connection");
const SequelizeStore = require("connect-session-sequelize")(session.Store);
const app = express();
const PORT = process.env.PORT || 3001;

const passport = require("./config/passport");

const hbs = exphbs.create({ helpers });

//  ================================ PASSPORT =================================

const sess = {
    secret: 'Super secret secret',
    cookie: {},
    resave: false,
    saveUninitialized: true,
    // store: new SequelizeStore({
    //   db: sequelize,
    // }),
  };

app.use(session(sess));
//  ================================================================================
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

console.log(path.join(__dirname, 'public'));

app.use(express.static(path.join(__dirname, 'public')));
app.use(function(req, res, next) {
  console.log(`${req.method} requested on endpoint ${req.path}`)
  next();
})
app.use(routes);

// ========================= PASSPORT ===================================

app.use(
  session({ secret: "keyboard cat", resave: true, saveUninitialized: true })
);
app.use(passport.initialize());
app.use(passport.session());

//  ======================================================================

sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log(`Now listening on localhost: ${PORT}`, ));
});