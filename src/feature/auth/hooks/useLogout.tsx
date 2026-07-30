import { useMutation } from "@tanstack/react-query";
import { authApi } from "../service";
import { toast } from "sonner";
import { useAuthStore } from "../store";

export const useLogoutMutation = () => {
  const clearToken = useAuthStore((s) => s.clearToken);

  return useMutation<void, Error, void>({
    mutationFn: () => authApi.logout(),
    onSuccess: () => {
      clearToken();
      toast.success("Logout successful");
    },

    onError: () => {
      clearToken();
      toast.success("Logout successful");
    },
  });
};
