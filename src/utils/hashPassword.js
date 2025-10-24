
const bcrypt = require("bcryptjs");

async function hashPassword(password) {
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log("Password:", password);
    console.log("Hashed Password:", hashedPassword);
    return hashedPassword;
  } catch (error) {
    console.error("Error hashing password:", error);
  }
}

if (require.main === module) {
  const password = process.argv[2] || "password123";
  console.log("\n--- Password Hasher ---\n");
  hashPassword(password);
}

module.exports = hashPassword;
