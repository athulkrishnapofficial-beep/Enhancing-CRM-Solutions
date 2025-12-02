export const getProfile = (req, res) => {
  res.json({ message: "Your Profile", user: req.user });
};
