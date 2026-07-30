import type { Role } from "@/shared/type";


export interface AuthState {
  accessToken: string | null;
  role: Role | null;
}

export interface AuthAction {
  setToken: (accessToken: string, role: Role | null) => void,
  clearToken: () => void;
}

export interface User {
  userId: string,
  email: string,
  fullName: string,
  role: string
}
//input shema
export interface LoginSchema {
  email: string;
  password: string
}

//output schema
export interface AuthToken {
  accessToken: string;
}

