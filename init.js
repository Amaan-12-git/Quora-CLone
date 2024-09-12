const mongoose = require("mongoose");
const User = require("./models/chat.js");
main()
  .then((res) => {
    console.log("Connection Success");
  })
  .catch((err) => {
    console.log(err);
  });

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/whatsapp");
}
User.insertMany([
  {
    from: "Amaan",
    to: "Adnan",
    msg: "Hello!!",
    created_at: new Date(),
  },
  {
    from: "Adnan",
    to: "Ayaan",
    msg: "Hello How are you?",
    created_at: new Date(),
  },
  {
    from: "Ayaan",
    to: "Adnan",
    msg: "Good Morning",
    created_at: new Date(),
  },
  {
    from: "Adeel",
    to: "Adnan",
    msg: "Nice to meet you!",
    created_at: new Date(),
  },
])
  .then((res) => {
    console.log(res);
  })
  .catch((err) => {
    console.log(err);
  });
