import { getUserById } from "@/api/users/getUserById";
import { updateUser } from "@/api/users/updateUser";
import { User } from "@/types/user.type";
import { useMutation, useQuery } from "@tanstack/react-query";

export function useUserById(id: string) {
    return useQuery({
        queryKey: ["user", id],
        queryFn: () => getUserById(id),
        enabled: !!id,
    });
}

export function useUpdateUser() {
    return useMutation({
        mutationFn: (body: User) => updateUser({ body }),

        onError: (error: any) => {
            console.error("Erreur", error);
            alert(
                "Erreur lors de la mofification des informations utilisateurs."
            );
        },
    });
}
