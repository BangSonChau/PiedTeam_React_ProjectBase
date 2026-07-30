import type { BaseFiterParams } from "@/shared/type";

export interface Ritual {
  id: string,
  createdAt: string,
  updatedAt: string,
  name: string,
  timeOfExecution?: string,
  dateLunar: string,
  dateSolar: string,
  difficultyLevel: "dễ" | "trung bình" | "khó" | "rất khó",
  description?: string,
  content?: string,
  reference?: string,
  isHot: boolean,
  ritualCategoryId?: string,
  ritualCategory?: string,
  prayers?: string[],
  ritualMedias?: string[],
  tag?: string[],
}

//create
export type CreateRitual = Partial<Ritual>
//update
export type UpdateRitual = Partial<Ritual>

//filterParams
export interface RitualFiterParams extends BaseFiterParams {
  difficultyLevel?: string;
  isHot?: boolean;
  ritualCatogoryID?: string
}