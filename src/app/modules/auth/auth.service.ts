import { createUserToken } from "../../utils/useToken";
import { IUser } from "../user/user.interface";
import { User } from "../user/user.model";
import bcrypt from "bcrypt";

const credentialLogin = async (payload: Partial<IUser>) => {
  const { email, password } = payload;

  const isExistsUser = await User.findOne({ email });

  if (!isExistsUser) {
    throw new Error("user not found ❌");
  }

  const isPasswordMatch = await bcrypt.compare(
    password as string,
    isExistsUser.password as string
  );

  if (!isPasswordMatch) {
    throw new Error("Invalid password ❌");
  }

  const generateToken = createUserToken(isExistsUser);

  const { password: pass, ...rest } = isExistsUser.toObject();
  return {
    accessToken: generateToken,
    user: rest,
  };
};

export const AuthService = {
  credentialLogin,
};
