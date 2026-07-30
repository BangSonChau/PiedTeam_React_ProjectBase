//api cho user

import { api } from "@/lib/axios";
import type { UserResponse } from "./type";

export const userApi = {

  async getMe(): Promise<UserResponse> {
    return await api.get("user/me") as unknown as Promise<UserResponse>;
  }
}


