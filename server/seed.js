const User = require("./models/User");

const defaultUsers = [
  { username: "User1", email: "user1@example.com", role: "User" },
  { username: "User2", email: "user2@example.com", role: "Supervisor" },
  { username: "User3", email: "user3@example.com", role: "Admin" },
];

async function seedUsers() {
  try {
    // Use a loop to check  users in the database
    for (const defaultUser of defaultUsers) {
      const existingUser = await User.findOne({ email: defaultUser.email });
      if (!existingUser) {
        const newUser = new User(defaultUser);
        await newUser.save();
        console.log(`User ${defaultUser.username} added successfully.`);
      } else {
        console.log(`User ${defaultUser.username} already exists.`);
      }
    }
  } catch (error) {
    console.error("Error seeding users:", error);
  }
}

module.exports = seedUsers;
