import { supabase } from "@/utils/supabase";

export async function getRoleAnnouncement(
    announcement_id: string
): Promise<string | null> {
    try {
        const {
            data: { user },
            error: userError,
        } = await supabase.auth.getUser();

        if (userError || !user) {
            console.error(
                "Utilisateur non connecté ou erreur auth:",
                userError
            );
            return null;
        }
        console.log("Utilisateur connecté:", user.id);

        const { data, error } = await supabase
            .from("user_annonces")
            .select("role")
            .eq("user_id", user.id)
            .eq("announcement_id", announcement_id)
            .maybeSingle();

        if (error) {
            console.error(
                "Erreur lors de la récupération du rôle de l'annonce:",
                error
            );
            return null;
        }

        return data?.role;
    } catch (error) {
        console.error("Erreur inattendue dans getRoleAnnouncement:", error);
        return null;
    }
}
