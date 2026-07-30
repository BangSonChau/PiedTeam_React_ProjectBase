import type { CreateRitual, Ritual, RitualFiterParams, UpdateRitual } from "./type";
import { createBaseService } from '@/shared/service/BaseService';

export const ritualService = createBaseService<
  Ritual,
  CreateRitual,
  UpdateRitual,
  RitualFiterParams
>({
  endpoint: `ritual`,
})