import { formAuthStyles } from "@/styles/form.styles";
import { supabase } from "@/utils/supabase";
import { yupResolver } from "@hookform/resolvers/yup";
import { router } from "expo-router";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { Image, Text, TextInput, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import * as yup from "yup";

export default function Register() {
    const insets = useSafeAreaInsets();

    const schema = yup.object({
        email: yup.string().email("Email invalide").required("Email requis"),
        password: yup
            .string()
            .min(6, "6 caractères min.")
            .required("Mot de passe requis"),
        confirmPassword: yup
            .string()
            .oneOf(
                [yup.ref("password")],
                "Les mots de passe ne correspondent pas"
            )
            .required("Confirmation requise"),
    });
    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
    });

    const onSubmit = async (data: {
        email: string;
        password: string;
        confirmPassword: string;
    }) => {
        const { email, password } = data;
        const { data: user, error } = await supabase.auth.signUp({
            email,
            password,
        });

        if (error) {
            console.log("Erreur inscription:", error.message);
            return;
        }
        router.replace("/(tabs)/home");
    };
    return (
        <View
            style={[
                { flex: 1, backgroundColor: "#e8ecf4" },
                {
                    paddingTop: insets.top,
                    // paddingBottom: insets.bottom,
                    paddingLeft: insets.left,
                    paddingRight: insets.right,
                },
            ]}
        >
            <View style={formAuthStyles.container}>
                <View style={formAuthStyles.header}>
                    <Image
                        alt="App Logo"
                        resizeMode="contain"
                        style={formAuthStyles.headerImg}
                        source={{
                            uri: "https://assets.withfra.me/SignIn.2.png",
                        }}
                    />

                    <Text style={formAuthStyles.title}>
                        Inscris toi à
                        <Text style={{ color: "#075eec" }}>MyApp</Text>
                    </Text>

                    <Text style={formAuthStyles.subtitle}>
                        Et commence à reduire ton empreinte carbone
                    </Text>
                </View>

                <View style={formAuthStyles.form}>
                    <View style={formAuthStyles.input}>
                        <Text style={formAuthStyles.inputLabel}>E-mail</Text>
                        <Controller
                            control={control}
                            name="email"
                            render={({
                                field: { onChange, onBlur, value },
                            }) => (
                                <TextInput
                                    autoCapitalize="none"
                                    autoCorrect={false}
                                    clearButtonMode="while-editing"
                                    keyboardType="email-address"
                                    onChangeText={onChange}
                                    placeholder="john@example.com"
                                    placeholderTextColor="#6b7280"
                                    style={formAuthStyles.inputControl}
                                    value={value}
                                    onBlur={onBlur}
                                />
                            )}
                        />
                        {errors.email && (
                            <Text style={formAuthStyles.error}>
                                {errors.email.message}
                            </Text>
                        )}
                    </View>

                    <View style={formAuthStyles.input}>
                        <Text style={formAuthStyles.inputLabel}>
                            Mot de passe
                        </Text>
                        <Controller
                            control={control}
                            name="password"
                            render={({
                                field: { onChange, onBlur, value },
                            }) => (
                                <TextInput
                                    autoCorrect={false}
                                    clearButtonMode="while-editing"
                                    value={value}
                                    onBlur={onBlur}
                                    onChangeText={onChange}
                                    placeholder="********"
                                    placeholderTextColor="#6b7280"
                                    style={formAuthStyles.inputControl}
                                    secureTextEntry={true}
                                />
                            )}
                        />
                        {errors.password && (
                            <Text style={formAuthStyles.error}>
                                {errors.password.message}
                            </Text>
                        )}
                    </View>
                    <View style={formAuthStyles.input}>
                        <Text style={formAuthStyles.inputLabel}>
                            Confirmation du mot de passe
                        </Text>
                        <Controller
                            control={control}
                            name="confirmPassword"
                            render={({
                                field: { onChange, onBlur, value },
                            }) => (
                                <TextInput
                                    autoCorrect={false}
                                    clearButtonMode="while-editing"
                                    value={value}
                                    onBlur={onBlur}
                                    onChangeText={onChange}
                                    placeholder="********"
                                    style={formAuthStyles.inputControl}
                                    secureTextEntry={true}
                                />
                            )}
                        />
                        {errors.confirmPassword && (
                            <Text style={formAuthStyles.error}>
                                {errors.confirmPassword.message}
                            </Text>
                        )}
                    </View>

                    <View style={formAuthStyles.formAction}>
                        <TouchableOpacity onPress={handleSubmit(onSubmit)}>
                            <View style={formAuthStyles.btn}>
                                <Text style={formAuthStyles.btnText}>
                                    Let's go
                                </Text>
                            </View>
                        </TouchableOpacity>
                    </View>

                    <TouchableOpacity
                        onPress={() => {
                            // handle link
                        }}
                    >
                        <Text style={formAuthStyles.formLink}>
                            Petit trou de mémoire?
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>

            <TouchableOpacity
                onPress={() => {
                    router.push("/signin");
                }}
            >
                <Text style={formAuthStyles.formFooter}>
                    Déjà un compte ?{" "}
                    <Text style={{ textDecorationLine: "underline" }}>
                        Connect toi
                    </Text>
                </Text>
            </TouchableOpacity>
        </View>
    );
}
