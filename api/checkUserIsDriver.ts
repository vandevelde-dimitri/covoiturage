import { supabase } from "@/utils/supabase";
import { getAnnouncementByidWithUser } from "./announcement/getAnnouncementByIdWithUser";

export async function checkUserIsDriver(
    announcement_id: string
): Promise<string | null> {
    try {
        const response = await getAnnouncementByidWithUser(announcement_id);

        const { data, error } = await supabase
            .from("users")
            .select("to_convey")
            .eq("id", response?.user_id)
            .single();

        if (error) {
            console.error(
                "Erreur lors de la récupération du rôle de l'annonce:",
                error
            );
            return null;
        }

        return data?.to_convey;
    } catch (error) {
        console.error("Erreur inattendue dans checkUserIsDriver:", error);
        return null;
    }
}
