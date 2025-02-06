import { LoginData } from "@/modules/validations/login";
import { api } from "../config";
import BaseService from "../base";
import { UserProfileData } from "@/components/user/profile-form";
class UserService extends BaseService<User, UserToCreate, UserToUpdate> {
  async login(dataToLogin: LoginData) {
    const { data } = await api.post<User>("/login", dataToLogin);
    return data;
  }

  async getAcessToken() {
    const { data } = await api.get<{ access_token: string }>("/refresh-token");
    return data;
  }
  async logout() {
    await api.delete("/logout");
  }
  async getSession() {
    const { data } = await api.get<User>("/users/session");
    return data;
  }

  async simpleUpdate(
    id: string,
    dataToUpdate: UserProfileData & { foto?: File }
  ) {
    const { data } = await api.put<User>(`/users/simple/${id}`, dataToUpdate, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return data;
  }
  assign(data: { telefone: string; id_pessoa: string }) {
    return api.post<User>("/users/assign", data);
  }
}

export const userService = new UserService("/users");
