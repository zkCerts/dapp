import {ApiSdk, SupportedUrl} from "@bandada/api-sdk"
import {API_KEY_BANDADA, GROUP_IDS} from "@/utils/constants";

const apiSdk = new ApiSdk(SupportedUrl.DEV)

interface AddMemberToGroup {
    groupId: string
    memberId: string
}

export const addMemberToGroup = async ({groupId, memberId}: AddMemberToGroup) => {
    const response = await apiSdk.addMemberToGroup(groupId, memberId, API_KEY_BANDADA)
    return response
}

export const addMemberToPassportLteFive = async ({memberId}: { memberId: string }) => {
    return await addMemberToGroup({groupId: GROUP_IDS.PASSPORT_LTE_FIVE, memberId})
}