import { supabase } from "@/utils/supabase";

export async function checkIsDriver(): Promise<boolean> {
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
            return false;
        }
        console.log("Utilisateur connecté:", user.id);

        const { data, error } = await supabase
            .from("users")
            .select("to_convey")
            .eq("id", user.id)
            .single();

        if (error) {
            console.error("Erreur lors de la récupération de isDriver:", error);
            return false;
        }

        return data.to_convey;
    } catch (error) {
        console.error("Erreur inattendue dans checkIsDriver:", error);
        return false;
    }
}
