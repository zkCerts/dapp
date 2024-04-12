"use client"

export const useAddMemberToPassportLteFive = () => {
    const postMemberRequest = async ({memberId}: { memberId: string }) => {
        const body = JSON.stringify({
            memberId
        })
        const res = await fetch('/api/bandada', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body
        })

        console.log(res);

        const data = await res.json()

        return Response.json({data})

    }

    return {postMemberRequest}
}