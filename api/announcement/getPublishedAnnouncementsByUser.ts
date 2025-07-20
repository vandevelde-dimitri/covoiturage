import { supabase } from "@/utils/supabase";

export async function getPublishedAnnouncementsByUser(userId: string) {
    try {
        const { data, error } = await supabase
            .from("annonces")
            .select(
                `
                id,
                title,
                content,
                number_of_places,
                user_id,
                users (
                    id,
                    firstname,
                    lastname,
                    contract,
                    team,
                    city,
                    image_profile,
                    to_convey,
                    is_available
                )
            `
            )
            .eq("user_id", userId);

        if (error) {
            console.error("Erreur récupération des annonces publiées:", error);
            return [];
        }

        return data;
    } catch (error) {
        console.error(
            "Erreur inattendue dans getPublishedAnnouncementsByUser:",
            error
        );
        return [];
    }
}
