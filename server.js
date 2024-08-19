var express = require("express");
var bodyParser = require("body-parser");
var app = express();
var http = require("http").Server(app);
var io = require("socket.io")(http);
var mongoose = require("mongoose");

app.use(express.static(__dirname));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

var dbUrl =
  "mongodb+srv://admin-ph:123Admin123@cluster0.wpwh6et.mongodb.net/learning-node?retryWrites=true&w=majority&appName=Cluster0";

var Message = mongoose.model("Message", {
  name: String,
  message: String,
});

app.get("/messages", async (req, res) => {
  var result = await Message.find({});
  res.send(result);
});
app.get("/messages/:user", async (req, res) => {
  const user = req.params["user"];
  console.log(user);
  var result = await Message.findOne({ name: user });
  res.send(result);
});
app.post("/messages", async (req, res) => {
  try {
    var message = new Message(req.body);

    await message.save();

    var censored = await Message.findOne({ message: "bad word" });

    if (censored) await Message.deleteOne({ _id: censored._id });
    else io.emit("message", req.body);

    res.sendStatus(200);
  } catch (err) {
    res.sendStatus(500);
    return console.error(err);
  } finally {
    // logger.log('message post called')
  }
});
io.on("connection", (socket) => {
  console.log("A user connected");
});

mongoose.connect(dbUrl);

var server = http.listen(3000, () => {
  console.log("Server is listening on port: ", server.address().port);
});
