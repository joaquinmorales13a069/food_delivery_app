import { View, Text, Button, Alert } from "react-native";
import React, { useState } from "react";
import { Link, router } from "expo-router";
import CustomInput from "@/components/CustomInput";
import CustomButton from "@/components/CustomButton";
import { signIn } from "@/libs/appwrite";

export default function SignIn() {
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [form, setForm] = useState({ email: "", password: "" });

	const { email, password } = form;

	const submit = async () => {
		if (!email || !password) {
			return Alert.alert(
				"Error",
				"Please enter a valid email and password",
			);
		}

		setIsSubmitting(true);
		try {
			// 	Call Appwrite login function here
			await signIn({ email, password });

			router.replace("/");
		} catch (e: any) {
			Alert.alert("Error", e.message);
		} finally {
			setIsSubmitting(false);
		}
	};

	return (
		<View className={"gap-10 p-5 mt-5 bg-white rounded-lg"}>
			<CustomInput
				placeholder={"Enter your email"}
				value={form.email}
				onChangeText={(text) =>
					setForm((prev) => ({ ...prev, email: text }))
				}
				label={"Email"}
				keyboardType={"email-address"}
			/>

			<CustomInput
				placeholder={"Enter your password"}
				value={form.password}
				onChangeText={(text) =>
					setForm((prev) => ({ ...prev, password: text }))
				}
				label={"Password"}
				secureTextEntry={true}
			/>
			<CustomButton
				title="Sign In"
				isLoading={isSubmitting}
				onPress={submit}
			/>

			<View className="flex flex-row justify-center gap-2 mt-5">
				<Text className="text-gray-100 base-regular">
					Don&apos;t have an account?
				</Text>
				<Link href="/SignUp" className="base-bold text-primary">
					Sign Up
				</Link>
			</View>
		</View>
	);
}
