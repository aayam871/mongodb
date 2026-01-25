const express = require("express");
const app = express();
const User = require("./userModel");
const bycrypt = require("bycrypt");

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
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    await User.create({
      ...req.body,
      password: hashedPassword,
    });

    res.redirect("/login");
  } catch (err) {
    console.error(err);
    res.send("Signup error");
  }
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
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.send("❌ Invalid email or password");

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) return res.send("❌ Invalid email or password");

    // ✅ Login success → show user info
    res.send(`
      <h1>✅ You are successfully logged in</h1>
      <h2>Your Information:</h2>
      <ul>
        <li>First Name: ${user.firstName}</li>
        <li>Last Name: ${user.lastName}</li>
        <li>Address: ${user.address}</li>
        <li>Email: ${user.email}</li>
        <li>Password (hashed): ${user.password}</li>
      </ul>
    `);
  } catch (err) {
    console.error(err);
    res.send("Login error");
  }
});

/* ================= SERVER ================= */
app.listen(3000, () => {
  console.log("Server running at http://localhost:3000/signup");
});
