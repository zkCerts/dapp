"use client"
import axios from 'axios'

export const useAddMemberToPassportLteFive = () => {
    const postMemberRequest = async ({memberId}: { memberId: string }) => {

        console.log("Member ID: ", memberId)

        const res = await axios.post('/api/bandada', {memberId})

        console.log(res)

        return res.data

    }

    const getMembership = async ({memberId}: { memberId: string }) => {
        const res = await axios.get('/api/bandada', {data: {memberId}})
        console.log('member', res)
        return res.data
    }

    return {postMemberRequest, getMembership}
}