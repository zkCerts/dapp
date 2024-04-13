import {addMemberToPassportLteFive} from "@/utils/bandada";
import {NextRequest, NextResponse} from "next/server";
import {AxiosError} from "axios";

export const dynamic = 'force-dynamic' // defaults to auto

export async function GET(req: Request) {

    return NextResponse.json({message: 'Hello World'})
}

export async function POST(req: Request) {
    const body = await req.json()
    const memberId = body.memberId

    console.log("Member ID: ", memberId)
    //TODO add memberId validations

    try {
        const bandadaRes = await addMemberToPassportLteFive({memberId});

        return NextResponse.json(bandadaRes);
    } catch (e) {
        console.error("Error: ", e);
        // @ts-ignore
        if (e.isAxiosError) {
            const axiosError = e as AxiosError;
            return NextResponse.json({error: axiosError.response?.data});
        }
        return NextResponse.json({error: e.body});
    }
}