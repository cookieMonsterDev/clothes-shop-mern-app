import { userModel } from "../../../models/models";
import HttpErrors from "../../errorHandling/httpErrors";
import { AuthUserTypes } from "../types/types";

const verifyInputUser = async (body: AuthUserTypes): Promise<AuthUserTypes> => {
  try {
    const firstUser = await userModel.findOne({ username: body.username });
    if (firstUser) throw new HttpErrors(`Username is taken`, 401);

    const secondUser = await userModel.findOne({ email: body.email });
    if (secondUser) throw new HttpErrors(`Email is taken`, 401);

    return body;
  } catch (err) {
    throw new HttpErrors(`Verifcation failed: ${err.message}`, 401);
  }
};

export default verifyInputUser;
