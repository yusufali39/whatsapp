const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const Chat = require("./models/chat.js");
const methodOverride = require("method-override");

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")))
app.use(express.urlencoded({extended: true}));
app.use(methodOverride("_method"));

main().then(()=>{console.log("connection successfull")})
.catch(err => console.log(err));

async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/whatsapp');
};
//index route
app.get("/chats", async (req, res) => {
    let chats = await Chat.find();
    res.render("index.ejs", {chats});
})

//create route
app.post("/chats", async (req, res) => {
    let { from, to, msg } = req.body;
    try {
      let savedChat = await new Chat({
        from: from,
        to: to,
        msg: msg,
        created_at: new Date(),
      }).save();
      console.log("Chat sent", savedChat);
      res.redirect("/chats");
    } catch (err) {
      console.error("Error sending chat:", err);
    }
  });
  app.post('/redirect', (req, res) => {
    res.redirect('/chats');
  });

  // edit route
  app.get("/chats/:id/edit", async (req, res)=>{
    let {id} = req.params;
    let chat = await Chat.findById(id);
    res.render("edit.ejs", { chat });
  })
  //update route
  app.put("/chats/:id", async(req, res)=>{
    let {id} = req.params;
    let {msg: newMsg} = req.body;
    console.log(newMsg);
    let updatedChat = await Chat.findByIdAndUpdate(
      id, 
      {msg: newMsg}, 
      { runValidators: true, new: true}
      );
      res.redirect("/chats");
  })

  //delet chat
  app.delete("/chats/:id", async(req, res) => {
    let {id} = req.params;
    let deletedChat = await Chat.findByIdAndDelete(id);
    console.log(deletedChat);
    res.redirect("/chats");
  })

app.get("/", (req, res) =>{
  res.render("home.ejs")
}).listen(8080, () => {console.log("server is listening on port 8080")}); 