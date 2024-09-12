const express = require("express");
const app = express();
const path = require("path");
const methodOverride = require("method-override");
const User = require("./models/chat.js");

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));
app.use(express.static(path.join(__dirname, "/public")));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride("_method"));

app.get("/", (req, res) => {
  res.send("<h1>Whatsapp</h1>");
});
app.get("/chats", async (req, res) => {
  let user = await User.find({});
  res.render("index.ejs", { user });
});
app.get("/chats/:id/edit", async (req, res) => {
  let id = await req.params.id;
  let user = await User.findById(id);
  res.render("edit.ejs", { user });
});
app.patch("/chats/:id", async (req, res) => {
  let new_msg = req.body.msg;
  let id = req.params.id;
  await User.findByIdAndUpdate(id, { msg: new_msg }, { runValidators: true });
  res.redirect("/chats");
});
app.delete("/chats/:id", async (req, res) => {
  let id = req.params.id;
  await User.findByIdAndDelete(id);
  res.redirect("/chats");
});
app.get("/chats/new", (req, res) => {
  res.render("new.ejs");
});
app.post("/chats", async (req, res) => {
  let { from, to, msg } = req.body;
  let date = new Date();
  let user = new User({ from: from, to: to, msg: msg, created_at: date });
  await user.save();
  res.redirect("/chats");
});
app.listen("8080", () => {
  console.log("server is listening on 8080");
});
