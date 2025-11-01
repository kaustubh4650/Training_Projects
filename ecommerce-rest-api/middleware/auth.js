const jwt = require("jsonwebtoken");
const User = require("../models/User");

exports.protect = async (req, res, next) => {
  let token;

  // ✅ Extract token from Authorization header or cookie
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  } else if (req.cookies.token) {
    token = req.cookies.token;
  }

  if (!token) {
    return res
      .status(401)
      .json({ success: false, error: "Not authorized, token missing" });
  }

  try {
    // ✅ Decode token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // ✅ Attach user to request
    req.user = await User.findById(decoded.id).select("-passwordHash");

    if (!req.user)
      return res
        .status(401)
        .json({ success: false, error: "No user found for token" });

    next();
  } catch (err) {
    console.error("JWT verification failed:", err.message);
    return res
      .status(401)
      .json({ success: false, error: "Not authorized, token invalid" });
  }
};

exports.authorize = (...roles) => {
  return (req, res, next) => {
    if (!req.user)
      return res.status(401).json({ success: false, error: "Not authorized" });
    if (!roles.includes(req.user.role)) {
      return res
        .status(403)
        .json({ success: false, error: "Forbidden: insufficient role" });
    }
    next();
  };
};
