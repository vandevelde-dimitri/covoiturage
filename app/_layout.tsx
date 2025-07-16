// app/_layout.tsx
import { AuthProvider, useAuth } from "@/hooks/authContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Slot, useRouter, useSegments } from "expo-router";
import React, { useEffect } from "react";

function InitialLayout() {
    const { session, loading } = useAuth();
    const segments = useSegments();
    const router = useRouter();

    const inAuthGroup = segments[0] === "(auth)";
    const inTabsGroup = segments[0] === "(tabs)";

    useEffect(() => {
        if (!loading) {
            if (!session && !inAuthGroup) {
                router.replace("/signin");
            }

            if (session && inAuthGroup) {
                router.replace("/home");
            }
        }
    }, [session, loading]);

    if (loading) return null;

    return <Slot />;
}

export default function RootLayout() {
    const queryClient = new QueryClient();
    return (
        <QueryClientProvider client={queryClient}>
            <AuthProvider>
                <InitialLayout />
            </AuthProvider>
        </QueryClientProvider>
    );
}
