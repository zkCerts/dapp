import {Address, keccak256, toHex} from "viem";

export const generateMemberId = (groupId: bigint, score: number, user: Address) => {
    return keccak256(toHex(groupId.toString() + score.toString() + user));
}