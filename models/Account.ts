import { Schema, model, models, ObjectId } from "mongoose";

export type AccountType = {
  provider: string;
  type: string;
  providerAccountId: string;
  access_token: string;
  token_type: string;
  scope: string;
  userId: ObjectId;
};

const accountSchema = new Schema<AccountType>({
  provider: String,
  type: String,
  providerAccountId: String,
  access_token: String,
  token_type: String,
  scope: String,
  userId: Schema.Types.ObjectId,
});

const Account = models.Account || model("Account", accountSchema);

export default Account;
