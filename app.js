const express = require("express");
const app = express();
const User = require("./userModel");

app.use(express.urlencoded({ extended: true }));

/* ================= SIGNUP PAGE ================= */
app.get("/signup", (req, res) => {
  res.send(`
    <h2>Signup</h2>
    <form action="/signup" method="POST">
      <input type="text" name="firstName" placeholder="First Name" required /><br/><br/>
      <input type="text" name="lastName" placeholder="Last Name" required /><br/><br/>
      <input type="text" name="address" placeholder="Address" required /><br/><br/>
      <input type="email" name="email" placeholder="Email" required /><br/><br/>
      <input type="password" name="password" placeholder="Password" required /><br/><br/>
      <button type="submit">Signup</button>
    </form>
  `);
});

/* ================= SIGNUP SAVE ================= */
app.post("/signup", async (req, res) => {
  await User.create(req.body);
  res.redirect("/login");
});

/* ================= LOGIN PAGE ================= */
app.get("/login", (req, res) => {
  res.send(`
    <h2>Login</h2>
    <form action="/login" method="POST">
      <input type="email" name="email" placeholder="Email" required /><br/><br/>
      <input type="password" name="password" placeholder="Password" required /><br/><br/>
      <button type="submit">Login</button>
    </form>
  `);
});

/* ================= LOGIN CHECK ================= */
app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const user = await User.find({ address });

  if (user) {
    res.redirect("/home");
  } else {
    res.send("❌ Invalid email or password");
  }
});

/* ================= HOME ================= */
app.get("/home", (req, res) => {
  res.send("<h1>✅ You are successfully logged in</h1>");
});

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000/signup");
});
