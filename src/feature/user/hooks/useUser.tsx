import { useQuery } from "@tanstack/react-query";
import { userApi } from "../service";

export const useUser = () => {
  return useQuery({
    queryKey: ["me"],
    queryFn: userApi.getMe,
  });
};
