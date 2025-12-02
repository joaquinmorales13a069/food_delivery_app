export const appwriteConfig = {
	endpoint: process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT,
	platform: "com.jmc.food_ordering",
	projectId: process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID,
	databaseId: process.env.EXPO_PUBLIC_APPWRITE_DATABASE_ID,
	userCollectionId: process.env.EXPO_PUBLIC_APPWRITE_USERS_TABLE_ID,
};
