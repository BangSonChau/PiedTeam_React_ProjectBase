import { useMutation } from "@tanstack/react-query";
import { authApi } from "../service";
import type { AuthToken, LoginSchema } from "../type";
import { toast } from "sonner";
import { jwtDecode } from "jwt-decode";
import { useAuthStore } from "../store";
import { useLocation } from "react-router-dom";
import type { Role } from "@/shared/type";

export interface JWTPayLoad {
  role: Role;
}

export const useLoginMuation = () => {
  const setToken = useAuthStore((s) => s.setToken);
  const location = useLocation();

  return useMutation<AuthToken, Error, LoginSchema>({
    mutationFn: (data) => authApi.login(data),
    onSuccess: (response) => {
      const decode = jwtDecode<JWTPayLoad>(response.accessToken);

      setToken(response.accessToken, decode.role);

      toast.success("Login successful");

      const redirectPath = location.state?.from || "/";

      console.log(redirectPath);

      window.location.replace(redirectPath);
    },

    onError: (error) => {
      toast.error(error.message);
    },
  });
};
