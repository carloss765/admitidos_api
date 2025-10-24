const db = require("../../db/mysql.js");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("../../config.js");

// Login function - authenticates user and returns JWT token
async function login(req, res) {
  try {
    const { email, password } = req.body;

    // Validate input
    if (!email || !password) {
      return res.status(400).json({
        error: true,
        message: "Email and password are required",
      });
    }

    // Find user by email
    const query = "SELECT * FROM people WHERE email = ? LIMIT 1";
    const users = await db.query(query, [email]);

    if (users.length === 0) {
      return res.status(401).json({
        error: true,
        message: "Invalid credentials",
      });
    }

    const user = users[0];

    // Verify password
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({
        error: true,
        message: "Invalid credentials",
      });
    }

    // Generate JWT token
    const token = jwt.sign(
      {
        id: user.id,
        email: user.email,
        name: user.name,
      },
      config.jwt.secret,
      {
        expiresIn: config.jwt.expiresIn,
      }
    );

    // Return success response with token and user info (excluding password)
    return res.status(200).json({
      error: false,
      message: "Login successful",
      data: {
        token,
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          document_type_id: user.document_type_id,
          document_number: user.document_number,
        },
      },
    });
  } catch (error) {
    console.error("Login error:", error);
    return res.status(500).json({
      error: true,
      message: "An error occurred during login",
    });
  }
}

// Verify token and return user info
async function verifyToken(req, res) {
  try {
    const user = req.user; // Comes from auth middleware

    // Get fresh user data from database
    const query = "SELECT * FROM people WHERE id = ? LIMIT 1";
    const users = await db.query(query, [user.id]);

    if (users.length === 0) {
      return res.status(404).json({
        error: true,
        message: "User not found",
      });
    }

    const userData = users[0];

    return res.status(200).json({
      error: false,
      message: "Token is valid",
      data: {
        user: {
          id: userData.id,
          name: userData.name,
          email: userData.email,
          document_type_id: userData.document_type_id,
          document_number: userData.document_number,
        },
      },
    });
  } catch (error) {
    console.error("Verify token error:", error);
    return res.status(500).json({
      error: true,
      message: "An error occurred while verifying token",
    });
  }
}

// Change password function
async function changePassword(req, res) {
  try {
    const { currentPassword, newPassword } = req.body;
    const userId = req.user.id;

    // Validate input
    if (!currentPassword || !newPassword) {
      return res.status(400).json({
        error: true,
        message: "Current password and new password are required",
      });
    }

    if (newPassword.length < 6) {
      return res.status(400).json({
        error: true,
        message: "New password must be at least 6 characters long",
      });
    }

    // Get user from database
    const query = "SELECT * FROM people WHERE id = ? LIMIT 1";
    const users = await db.query(query, [userId]);

    if (users.length === 0) {
      return res.status(404).json({
        error: true,
        message: "User not found",
      });
    }

    const user = users[0];

    // Verify current password
    const isPasswordValid = await bcrypt.compare(
      currentPassword,
      user.password
    );

    if (!isPasswordValid) {
      return res.status(401).json({
        error: true,
        message: "Current password is incorrect",
      });
    }

    // Hash new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Update password in database
    await db.update("people", {
      id: userId,
      password: hashedPassword,
    });

    return res.status(200).json({
      error: false,
      message: "Password changed successfully",
    });
  } catch (error) {
    console.error("Change password error:", error);
    return res.status(500).json({
      error: true,
      message: "An error occurred while changing password",
    });
  }
}

module.exports = {
  login,
  verifyToken,
  changePassword,
};
