import { checkIsDriver } from "./checkIsDriver";
import { checkUserIsDriver } from "./checkUserIsDriver";

export interface MatchPermissionResponse {
    status: boolean;
    message: string;
}

export async function matchPermission(
    announce_id: string
): Promise<MatchPermissionResponse> {
    const userIsDriver = await checkUserIsDriver(announce_id);
    const isDriver = await checkIsDriver();

    if (!userIsDriver && !isDriver) {
        return {
            status: false,
            message: "Une personne doit être conducteur pour covoiturer.",
        };
    }
    if (userIsDriver && !isDriver) {
        return {
            status: true,
            message: "Proposition envoyée pour covoiturer.",
        };
    }
    if (!userIsDriver && isDriver) {
        return {
            status: true,
            message: "Proposition envoyée pour covoiturer.",
        };
    }
    if (userIsDriver && isDriver) {
        return {
            status: true,
            message: "Proposition envoyée pour covoiturer.",
        };
    }
    if (userIsDriver === null) {
        return {
            status: false,
            message: "Une personne doit être conducteur pour covoiturer.",
        };
    }
    console.log("Data inconnu ou non géré.");
    return {
        status: false,
        message: "Data inconnu ou non géré pour cette annonce.",
    };
}
