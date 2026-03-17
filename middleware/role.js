const authorize = (...roles) => {
  return (req, res, next) => {
    // 1. Check if req.user exists (The "Guard")
    if (!req.user) {
      return res.status(401).json({
        message: "Not authorized, no user data found"
      });
    }

    // 2. Now it's safe to check the role
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        message: `Role (${req.user.role}) is not allowed to access this resource`
      });
    }
    next();
  };
};

export default authorize;