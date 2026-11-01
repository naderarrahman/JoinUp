import { authClient } from "./auth-client";

export const getTokenFromClient = async (): Promise<string | null> => {
  try {
    const { data, error } = await authClient.token();
    if (error) {
      console.error("Client token error:", error);
      return null;
    }
    return data?.token || null;
  } catch (error) {
    console.error("Failed to get token from client:", error);
    return null;
  }
};