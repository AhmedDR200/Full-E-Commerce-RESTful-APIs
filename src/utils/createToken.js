const jwt = require("jsonwebtoken");
const Token = require("../models/token");

// Create a access token
exports.signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

// Create a refresh token
exports.signRefreshToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: process.env.REFRESH_TOKEN_EXPIRES_IN,
  });
};

// Store the refresh token in the database
exports.storeRefreshToken = async (userId, refreshToken) => {
  const expiresAt = new Date(
    Date.now() + parseInt(process.env.REFRESH_TOKEN_EXPIRES_IN_MS)
  );

  await Token.create({
    user: userId,
    token: refreshToken,
    expiresAt,
  });
};

// Blacklist the refresh token
exports.blacklistToken = async (token) => {
  const decoded = jwt.decode(token);

  if (decoded && decoded.exp) {
    const expiresAt = new Date(decoded.exp * 1000);

    await Token.create({
      token,
      user: decoded.id,
      blacklisted: true,
      expiresAt,
    });
  }
};

// Check if the token is blacklisted
exports.isTokenBlacklisted = async (token) => {
  const existingToken = await Token.findOne({ token, blacklisted: true });
  return !!existingToken;
};
