import {assertExists} from "@/utils/assertExists";

export const API_KEY_BANDADA = assertExists(process.env.API_KEY_BANDADA)

export const GROUP_IDS = {
    PASSPORT_LTE_FIVE: "46774545629222152342475945532393206733223803750715862964972421322343962378240"
} as const