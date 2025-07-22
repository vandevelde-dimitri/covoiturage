import { supabase } from "@/utils/supabase";

export async function getAuth() {
    try {
        const {
            data: { user },
        } = await supabase.auth.getUser();

        return user;
    } catch (error) {
        console.error("Erreur inattendue dans updateAuth:", error);
        return null;
    }
}
