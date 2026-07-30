import { useQuery } from "@tanstack/react-query";
import { ritualService } from "../service";
import type { RitualFiterParams } from "../type";

export const useRituals = (params?: RitualFiterParams) => {
  const query = useQuery({
    queryKey: ["rituals", params],
    queryFn: () => ritualService.getAll(params),
  });

  return {
    rituals: query.data?.data ?? [],
    pagination: query.data?.meta,
    isLoading: query.isLoading,
    isError: query.isError,
    error: query.error,
    refetch: query.refetch,
  };
};
