import { useQuery } from "@tanstack/react-query";
import { ritualService } from "../service";

export const useRitual = (id: string | number) => {
  return useQuery({
    queryKey: ["ritual", id],
    queryFn: () => ritualService.getById(id),
  });
};