// import bcrypt from "bcryptjs";
// import jwt from "jsonwebtoken";
// import userModel from "../models/userModel.js";

// export const signin = async (req, res) => {
//   const { email, password } = req.body;
//   try {
//     const oldUser = await userModel.findOne({ email });
//     if (!oldUser)
//       return res.status(404).json({ message: "User doesn't exist." });
//     const isPasswordCorrect = await bcrypt.compare(password, oldUser.password);
//     if (!isPasswordCorrect)
//       return res.status(400).json({ message: "Incorrect password" });

//     const token = jwt.sign({ email: oldUser.email, id: oldUser._id }, "test", {
//       expiresIn: "1h",
//     });
//     return res.status(201).json({ result: oldUser, token });
//   } catch (error) {
//     res.status(500).json({ message: "Something went wrong" });
//   }
// };
// export const signup = async (req, res) => {
//   const { firstName, lastName, email, password, confirmPassword } = req.body;
//   try {
//     const existingUser =await userModel.findOne({ email });
//     console.log(
//       "🚀 ~ file: userModelController.js:28 ~ signup ~ existingUser",
//       existingUser
//     );
//     if (existingUser)
//       return res.status(400).json({ message: "User already exist" });
//     if (password !== confirmPassword)
//       return res.status(400).json({ message: "Passwords are not same" });
//     const hashpassword = await becrypt.hash(hashpassword, 12);
//     const result = await userModel.create({
//       email,
//       password: hashpassword,
//       name: `${firstName}+${lastName}`,
//     });
//     const token = jwt.sign({ email: result.email, id: result._id }, "test", {
//       expiresIn: "1h",
//     });
//     res.status(200).json({ result, token });
//   } catch (err) {
//     res.status(500).json({ meassage: "Something went wrong" });
//   }
// };
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import UserModel from "../models/userModel.js";

const secret = "test";

export const signin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const oldUser = await UserModel.findOne({ email });

    if (!oldUser)
      return res.status(404).json({ message: "User doesn't exist" });

    const isPasswordCorrect = await bcrypt.compare(password, oldUser.password);

    if (!isPasswordCorrect)
      return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign({ email: oldUser.email, id: oldUser._id }, secret, {
      expiresIn: "1h",
    });

    res.status(200).json({ result: oldUser, token });
  } catch (err) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

export const signup = async (req, res) => {
  const { email, password, firstName, lastName } = req.body;

  try {
    const oldUser = await UserModel.findOne({ email });

    if (oldUser)
      return res.status(400).json({ message: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 12);

    const result = await UserModel.create({
      email,
      password: hashedPassword,
      name: `${firstName} ${lastName}`,
    });

    const token = jwt.sign({ email: result.email, id: result._id }, secret, {
      expiresIn: "1h",
    });

    res.status(201).json({ result, token });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });

    console.log(error);
  }
};
