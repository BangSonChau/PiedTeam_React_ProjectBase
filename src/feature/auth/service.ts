
//api for auth feature

import { api } from "@/lib/axios"
import type { AuthToken, LoginSchema } from "./type";

export const authApi = {

  async login(cre: LoginSchema): Promise<AuthToken> {
    return await api.post("/auth/login", cre) as unknown as Promise<AuthToken>;
  },

  async logout(): Promise<void> {
    return await api.post("/auth/logout");
  }
}