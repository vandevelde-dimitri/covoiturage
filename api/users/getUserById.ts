import { supabase } from "@/utils/supabase";

export async function getUserById(id: string) {
    try {
        const { data, error } = await supabase
            .from("users")
            .select(
                `
                id,
                firstname,
                lastname,
                contract,
                team,
                city,
                image_profile,
                to_convey,
                is_available,
                push_notification,
                email_notification
            `
            )
            .eq("id", id)
            .single();
        if (error) {
            console.error("Erreur récupération utilisateur:", error);
            return null;
        }

        return data;
    } catch (error) {
        console.error("Erreur inattendue dans getUserById:", error);
        return null;
    }
}
