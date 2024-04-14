import {addMemberToPassportLteFive, getMembership} from "@/utils/bandada";
import {NextRequest, NextResponse} from "next/server";
import {AxiosError} from "axios";

export const dynamic = 'force-dynamic' // defaults to auto

export async function GET(req: Request) {
    const body = req.json()
    const memberId = body.memberId
    console.log("Member ID: ", memberId)
    try {
        const memberRes = await getMembership({groupId: '44024928577834135593430107966424', memberId});
        console.log("Member Response: ", memberRes)
        return NextResponse.json(memberRes);
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