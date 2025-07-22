import { UpdateAuthBody } from "@/types/auth.interface";
import { supabase } from "@/utils/supabase";

export async function updateAuth({ body }: { body: UpdateAuthBody }) {
    const { email, password } = body;
    try {
        const { data, error } = await supabase.auth.updateUser({
            email,
            password,
        });

        if (error) {
            console.error("Erreur récupération annonce:", error);
            return null;
        }

        return data;
    } catch (error) {
        console.error("Erreur inattendue dans updateAuth:", error);
        return null;
    }
}
