import { checkIsDriver } from "./checkIsDriver";
import { getRoleAnnouncement } from "./getRoleAnnouncement";

export async function matchPermission(announce_id: string): Promise<Boolean> {
    const role = await getRoleAnnouncement(announce_id);
    const isDriver = await checkIsDriver();
    console.log(`Role: ${role}, Is Driver: ${isDriver}`);

    if (role === "passenger" && !isDriver) {
        console.log(
            "Aucune personne ne peut covoiturer car l'utilisateur et l'annonceur n'est pas conducteur."
        );
        return false;
    }
    if (role === "driver" && !isDriver) {
        console.log(
            "L'utilisateur n'est pas conducteur, mais l'annonceur est conducteur."
        );
        return true;
    }
    if (role === "passenger" && isDriver) {
        console.log(
            "L'utilisateur est conducteur, il peut covoiturer en tant que passager."
        );
        return true;
    }
    if (role === "driver" && isDriver) {
        console.log(
            "L'utilisateur est conducteur, il peut covoiturer en tant que conducteur."
        );
        return true;
    }
    if (role === null) {
        console.log("Aucun rôle trouvé pour cette annonce.");
        return false;
    }
    console.log("Rôle inconnu ou non géré.");
    return false;
}
