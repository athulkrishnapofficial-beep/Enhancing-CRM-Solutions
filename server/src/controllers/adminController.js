export const adminData = (req, res) => {
  res.json({
    message: "Welcome Admin! Here is protected admin data.",
    user: req.user
  });
};
