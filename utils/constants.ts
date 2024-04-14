import {assertExists} from "@/utils/assertExists";

export const API_KEY_BANDADA = assertExists(process.env.API_KEY_BANDADA)

export const GROUP_IDS = {
    PASSPORT_LTE_FIVE: "44024928577834135593430107966424"
} as const
