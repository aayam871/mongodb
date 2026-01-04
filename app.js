// const express = require("express");
// const app = express();
// const User = require("./userModel");

// // app.use(express.json());
//   // json body padhxa

// app.get("/", (req, res) => {
//   res.send("Hello World");
// });

// app.post("/create", async (req, res) => {
//   const user = await User.create(req.body);
//   res.send(user);
// });

// app.listen(3000, () => {
//   console.log("Server running on 3000");
// });


// const u = new User(req.body); // object banauxa
// await u.save();               // DB ma save garauxa


const express = require("express");
const app = express();
const User = require("./userModel");

app.use(express.urlencoded({ extended: true })); // HTML form support

app.get("/", (req, res) => {
  res.send(`
    <form action="/create" method="POST">
      <input type="text" name="name" placeholder="Name" />
      <input type="email" name="email" placeholder="Email" />
      <input type="text" name="nickname" placeholder="Nickname" />
      <button type="submit">Submit</button>
    </form>
  `);
});

app.post("/create", async (req, res) => {
  const user = await User.create(req.body);
  res.send(`User saved! Name: ${user.name}, Email: ${user.email}`);
});

app.listen(3000, () => {
  console.log("Server running on 3000");
});
