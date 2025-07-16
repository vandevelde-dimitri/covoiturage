import { getUserById } from "@/api/users/getUserById";
import { useQuery } from "@tanstack/react-query";

export function useUserById(id: string) {
    return useQuery({
        queryKey: ["user", id],
        queryFn: () => getUserById(id),
        enabled: !!id,
    });
}
