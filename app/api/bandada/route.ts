import {addMemberToPassportLteFive} from "@/utils/bandada";

export type PostRequest = Request & {
    memberId: string
}
export const dynamic = 'force-dynamic' // defaults to auto
export async function POST({memberId}: PostRequest) {
    //TODO add memberId validations
    const response = await addMemberToPassportLteFive({memberId})

    return {
        status: response.status,
        body: await response.json()
    }
}