const jwt = require("jsonwebtoken");
const User = require("../models/User");

const protect = async (req, res, next) => {
  try {
    const token = req.header("Authorization")?.replace("Bearer ", "");

    if (!token) {
      return res
        .status(401)
        .json({ message: "No token, authorization denied" });
    }

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decoded.id).select("-password");
      if (!req.user)
        return res.status(401).json({ message: "User no longer exists" });
      return next();
    } catch (error) {
      if (error.name === "TokenExpiredError") {
        // If access token expired, check refresh token
        const refreshToken = req.cookies.refreshToken;
        if (!refreshToken)
          return res
            .status(401)
            .json({ message: "Session expired, please log in again" });

        try {
          const decoded = jwt.verify(refreshToken, process.env.REFRESH_SECRET);
          const newAccessToken = jwt.sign(
            { id: decoded.id },
            process.env.JWT_SECRET,
            { expiresIn: process.env.JWT_EXPIRES_IN }
          );

          res.json({ accessToken: newAccessToken }); // Send new access token
        } catch (refreshError) {
          return res
            .status(401)
            .json({ message: "Refresh token expired, please log in again" });
        }
      } else {
        return res.status(401).json({ message: "Invalid token" });
      }
    }
  } catch (error) {
    console.error("Auth Middleware Error:", error);
    return res.status(401).json({ message: "Authentication error" });
  }
};

module.exports = { protect };
