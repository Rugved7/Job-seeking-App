export const sendToken = (user, statuscode, res, message) => {
  const token = user.getJWTtoken();
  const options = {
    expires: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000),
    httpOnly: true,
  };
  res.status(statuscode).cookie("token", token, options).json({
    success: true,
    user,
    message,
    token,
  });
};
