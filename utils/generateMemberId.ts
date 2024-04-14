import {Address, keccak256, toHex} from "viem";

export const generateMemberId = (groupId: bigint, score: bigint, user?: Address) => {
    return keccak256(toHex(groupId.toString() + score.toString() + user));
}