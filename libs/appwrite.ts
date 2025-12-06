import { CreateUserParams, SignInParams } from "@/type";
import { Account, Avatars, Client, Databases, ID, Query } from "react-native-appwrite";

export const appwriteConfig = {
	endpoint: process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT,
	platform: "com.jmc.food_ordering",
	projectId: process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID,
	databaseId: process.env.EXPO_PUBLIC_APPWRITE_DATABASE_ID,
	userCollectionId: process.env.EXPO_PUBLIC_APPWRITE_USERS_TABLE_ID,
};

export const client = new Client();

// Initialize the client
client
	.setEndpoint(appwriteConfig.endpoint!)
	.setProject(appwriteConfig.projectId!)
	.setPlatform(appwriteConfig.platform!);

export const account = new Account(client);
export const databases = new Databases(client);
const avatars = new Avatars(client);

// Create User
export const createUser = async ({
	email,
	password,
	name,
}: CreateUserParams) => {
	try {
		const newAccount = await account.create(
			ID.unique(),
			email,
			password,
			name,
		);

		if (!newAccount) {
			throw new Error("Failed to create account");
		}

		await signIn({ email, password });
		const avatarUrl = avatars.getInitialsURL(name);

		// Create the user in database *for better database relationships*
		return await databases.createDocument(
			appwriteConfig.databaseId!,
			appwriteConfig.userCollectionId!,
			ID.unique(),
			{
				account_id: newAccount.$id,
				email,
				name,
				avatar: avatarUrl,
			},
		);
	} catch (error) {
		throw new Error(error as string);
	}
};

// Sign In user
export const signIn = async ({ email, password }: SignInParams) => {
	try {
		const session = await account.createEmailPasswordSession({
			email,
			password,
		});
	} catch (error) {
		throw new Error(error as string);
	}
};

// Get current User
export const getCurrentUser = async () => {
	try {
		const currentAccount = await account.get();
		
		if (!currentAccount) {
			throw new Error("Failed to get current user");
		}
		const currentUser = await databases.listDocuments(appwriteConfig.databaseId!, appwriteConfig.userCollectionId!, [Query.equal("account_id", currentAccount.$id)]);

		if (!currentUser) {
			throw new Error("Failed to get current user");
		}
		return currentUser.documents[0];
	} catch (error) {
		console.log(error);
		throw new Error(error as string);
	}
};
