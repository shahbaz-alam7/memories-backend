import jwt, { decode } from "jsonwebtoken";

const auth = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const isCustomAuth = token.length < 500;

    let decodeData;

    if (token && isCustomAuth) {
      decodeData = jwt.verify(token, "test");
      req.UserId = decodeData?.id;
    } else {
      // google login
      decodeData.jwt.varify(token);
      req.UserId = decodeData?.sub;
    }
    next();
  } catch (error) {
    console.log("Token", error);
  }
};

export default auth;
