import { supabase } from "@/utils/supabase";

export async function getFavoriteUser(userId: string) {
    try {
        const { data: favoriteLinks, error } = await supabase
            .from("user_annonces")
            .select("*")
            .eq("user_id", userId)
            .eq("favorite", true);

        if (error) {
            console.error("Erreur récupération des favoris:", error);
            return null;
        }

        if (!favoriteLinks || favoriteLinks.length === 0) {
            return [];
        }

        // Suppression des doublons
        const annonceIds = [
            ...new Set(favoriteLinks.map((fav) => fav.annonce_id)),
        ];

        const { data: announces, error: userError } = await supabase
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
            .in("id", annonceIds);

        if (userError) {
            console.error(
                "Erreur récupération des annonces favorites:",
                userError
            );
            return null;
        }

        return announces;
    } catch (error) {
        console.error("Erreur inattendue dans getFavoriteUser:", error);
        return null;
    }
}
