import { Account, Client, ID } from "appwrite";
import { conf } from "../conf/conf";

export class AuthService {
  client = new Client();
  account;
  constructor() {
    this.client.setEndpoint(conf.appwriteUrl).setProject(conf.projectId);
    this.account = new Account(this.client);
  }
  async createAccount({ email, password, name }) {
    try {
      const user = await this.account.create(
        ID.unique(),
        email,
        password,
        name
        
      );
      if (user) {
        // call login function, because when a user signup and it is success then we will redirect him to homepage
        return this.logIn({ email, password });
      } else {
        return user;
      }
    } catch (error) {
      return error;
    }
  }

  async logIn({ email, password }) {
    try {
      const user = await this.account.createEmailSession(email, password);
      return user;
    } catch (error) {
      return "can't log in";
    }
  }

  async getCurrent() {
    try {
      // get the current status, whether the user is logged in or not
      return await this.account.get();
    } catch (error) {
      console.log("Appwrite service :: logout :: error ", error);
    }
    return null;
  }

  async logOut() {
    try {
      // to logout the user from all the devices he/she has logged in
      return await account.deleteSessions();
    } catch (error) {
      console.log("Appwrite service :: logout :: error ", error);
    }
  }
}

const authService = new AuthService();

export default authService; // here we will not export the class instead we will export an object of the class, so that we can directly use the methods of that class
