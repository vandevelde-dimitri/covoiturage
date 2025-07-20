import { supabase } from "@/utils/supabase";

export async function getAllAnnouncementsWithUser() {
    try {
        const { data, error } = await supabase.from("annonces").select(`
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
            `);

        if (error) {
            console.error("Erreur récupération annonces:", error);
            return [];
        }

        return data;
    } catch (error) {
        console.error("Erreur inattendue dans getAllAnnouncements:", error);
        return [];
    }
}
