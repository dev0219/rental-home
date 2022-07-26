const express   = require('express')
const connectDB = require('./config/db')
const cors = require('cors')
const dotenv = require('dotenv');
const app = express()
app.use(cors());
const bodyParser = require('body-parser');
const http = require('http').Server(app);

const userRoutes = require("./routes/userRoutes.js");
const homesRoutes = require("./routes/homeRoutes.js");
const cartRoutes = require("./routes/cartRoutes.js");
const {GetUsers, EditUser, DeleteUser} = require("./routes/socketUser");
const { errorHandler, notFound } = require("./middleware/errorMiddleware.js");
const uploadRoutes = require("./routes/uploadRoutes.js");

dotenv.config()
connectDB()



app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use("/api/users", userRoutes);
app.use("/api/homes", homesRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/upload", uploadRoutes);

app.use(notFound);
app.use(errorHandler);

const io = require('socket.io')(http, {
    cors: {
        origin: '*',
        methods: ['GET', 'POST']
    }
});
io.on('connection', (socket) => {
    socket.on("GET_USERS", GetUsers(io, socket))
    socket.on("EDIT_USER", EditUser(io, socket))
    socket.on("DELETE_USER", DeleteUser(io, socket))
})

const PORT = process.env.PORT || 5000

http.listen(
    PORT,
    console.log(
      `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`
    )
  );