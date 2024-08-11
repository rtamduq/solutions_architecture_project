import { CognitoUserPool } from 'amazon-cognito-identity-js';
const poolData = {
  UserPoolId: "us-east-1_mz5obsPlS",
  ClientId: "5uqphk46gdneiqfeimo6hdt2nm",
};
export default new CognitoUserPool(poolData);