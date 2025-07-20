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
    console.log(
        `Is Driver user announcement: ${userIsDriver}, Is Driver user: ${isDriver}`
    );

    if (!userIsDriver && !isDriver) {
        console.log("Une personne doit être conducteur pour covoiturer. 01");
        return {
            status: false,
            message: "Une personne doit être conducteur pour covoiturer.",
        };
    }
    if (userIsDriver && !isDriver) {
        console.log("ok. 01");
        return {
            status: true,
            message: "Proposition envoyée pour covoiturer.",
        };
    }
    if (!userIsDriver && isDriver) {
        console.log("ok. 02");
        return {
            status: true,
            message: "Proposition envoyée pour covoiturer.",
        };
    }
    if (userIsDriver && isDriver) {
        console.log("ok. 03");
        return {
            status: true,
            message: "Proposition envoyée pour covoiturer.",
        };
    }
    if (userIsDriver === null) {
        console.log("Aucun rôle trouvé pour cette annonce.");
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
