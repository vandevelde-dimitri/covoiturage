import { checkIsDriver } from "./checkIsDriver";
import { getRoleAnnouncement } from "./getRoleAnnouncement";

export interface MatchPermissionResponse {
    status: boolean;
    message: string;
}

export async function matchPermission(
    announce_id: string
): Promise<MatchPermissionResponse> {
    const role = await getRoleAnnouncement(announce_id);
    const isDriver = await checkIsDriver();
    console.log(`Role: ${role}, Is Driver: ${isDriver}`);

    if (role === "passenger" && !isDriver) {
        console.log(
            "Aucune personne ne peut covoiturer car l'utilisateur et l'annonceur n'est pas conducteur."
        );
        return {
            status: false,
            message: "Une personne doit être conducteur pour covoiturer.",
        };
    }
    if (role === "driver" && !isDriver) {
        console.log(
            "L'utilisateur n'est pas conducteur, mais l'annonceur est conducteur."
        );
        return {
            status: true,
            message: "Proposition envoyée pour covoiturer.",
        };
    }
    if (role === "passenger" && isDriver) {
        console.log(
            "L'utilisateur est conducteur, il peut covoiturer en tant que passager."
        );
        return {
            status: true,
            message: "Proposition envoyée pour covoiturer.",
        };
    }
    if (role === "driver" && isDriver) {
        console.log(
            "L'utilisateur est conducteur, il peut covoiturer en tant que conducteur."
        );
        return {
            status: true,
            message: "Proposition envoyée pour covoiturer.",
        };
    }
    if (role === null) {
        console.log("Aucun rôle trouvé pour cette annonce.");
        return {
            status: false,
            message: "Une personne doit être conducteur pour covoiturer.",
        };
    }
    console.log("Rôle inconnu ou non géré.");
    return {
        status: false,
        message: "Rôle inconnu ou non géré pour cette annonce.",
    };
}
