import { getAuth } from "@/api/auth/getAuth";
import { updateAuth } from "@/api/auth/updateAuth";
import { UpdateAuthBody } from "@/types/auth.interface";
import { useMutation, useQuery } from "@tanstack/react-query";

export function useUpdateAuth() {
    return useMutation({
        mutationFn: (body: UpdateAuthBody) => updateAuth({ body }),

        onError: (error: any) => {
            console.error("Erreur", error);
            alert(
                "Erreur lors de la mofification des informations d'authentification."
            );
        },
    });
}

export function useGetAuth() {
    return useQuery({
        queryKey: ["auth"],
        queryFn: () => getAuth(),
    });
}
