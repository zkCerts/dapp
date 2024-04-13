import {ApiSdk, SupportedUrl} from "@bandada/api-sdk"
import {API_KEY_BANDADA, GROUP_IDS} from "@/utils/constants";

const apiSdk = new ApiSdk(SupportedUrl.PROD)

interface AddMemberToGroup {
    groupId: string
    memberId: string
}

export const addMemberToGroup = async ({groupId, memberId}: AddMemberToGroup) => {
    return await apiSdk.addMemberByApiKey(groupId, memberId, API_KEY_BANDADA)
}

export const addMemberToPassportLteFive = async ({memberId}: { memberId: string }) => {

    console.log(`Adding member ${memberId} to group ${GROUP_IDS.PASSPORT_LTE_FIVE}`);
    return addMemberToGroup({groupId: GROUP_IDS.PASSPORT_LTE_FIVE, memberId}).then(() =>
        ({message: 'Member added successfully'})).catch((e) => {
            console.error("Error: ", e);
            return {message: 'Error adding member'}
        }
    )
}