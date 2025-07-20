import { supabase } from "@/utils/supabase";

export async function getAnnouncementByUserId(user_id: string) {
    try {
        const { data, error } = await supabase
            .from("annonces")
            .select("*")
            .eq("user_id", user_id)
            .single();

        if (error) {
            console.error("Erreur récupération annonce:", error);
            return null;
        }

        console.log("Annonce récupérée:", data);

        return data;
    } catch (error) {
        console.error("Erreur inattendue dans getAnnouncementByid:", error);
        return null;
    }
}
