import { View, Text, Button, Alert } from "react-native";
import React, { useState } from "react";
import { Link, router } from "expo-router";
import CustomInput from "@/components/CustomInput";
import CustomButton from "@/components/CustomButton";
import { createUser } from "@/libs/appwrite";

export default function SignUp() {
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [form, setForm] = useState({ name: "", email: "", password: "" });

	const { name, email, password } = form;

	const submit = async () => {
		if (!name || !email || !password) {
			return Alert.alert(
				"Error",
				"Please enter a valid email and password",
			);
		}

		setIsSubmitting(true);
		try {
			// 	Call Appwrite SignUp function here
			await createUser({ name, email, password });

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
				placeholder={"Enter your name"}
				value={form.name}
				onChangeText={(text) =>
					setForm((prev) => ({ ...prev, name: text }))
				}
				label={"Full Name"}
				keyboardType={"default"}
			/>
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
				title="Sign Up"
				isLoading={isSubmitting}
				onPress={submit}
			/>

			<View className="flex flex-row justify-center gap-2 mt-5">
				<Text className="text-gray-100 base-regular">
					Already have an account?
				</Text>
				<Link href="/SignIn" className="base-bold text-primary">
					Sign In
				</Link>
			</View>
		</View>
	);
}
