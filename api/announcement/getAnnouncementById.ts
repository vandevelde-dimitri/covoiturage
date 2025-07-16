import { supabase } from "@/utils/supabase";

export async function getAnnouncementByid(id: string) {
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
                users!inner (
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
            .eq("id", id)
            .single();

        if (error) {
            console.error("Erreur récupération annonce:", error);
            return null;
        }

        console.log("Annonce récupérée:", data);

        return { ...data, user: data.users };
    } catch (error) {
        console.error("Erreur inattendue dans getAnnouncementByid:", error);
        return null;
    }
}
