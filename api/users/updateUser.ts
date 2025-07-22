import { User } from "@/types/user.type";
import { supabase } from "@/utils/supabase";

export async function updateUser({ body }: { body: User }) {
    const {
        id,
        city,
        contract,
        email_notification,
        firstname,
        image_profile,
        is_available,
        lastname,
        push_notification,
        team,
        to_convey,
    } = body;

    try {
        const { data, error } = await supabase
            .from("users")
            .update({
                lastname,
                firstname,
                city,
                team,
                contract,
                email_notification,
                push_notification,
                to_convey,
                is_available,
            })
            .eq("id", id);

        if (error) {
            console.error("Erreur récupération annonce:", error);
            return null;
        }

        return data;
    } catch (error) {
        console.error("Erreur inattendue dans updateUser:", error);
        return null;
    }
}
