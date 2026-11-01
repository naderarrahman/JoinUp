import { headers } from "next/headers";
import { auth } from "./auth";

export const getTokenFromServer = async (): Promise<string | null> => {
  try {
    const reqHeaders = await headers();
    const tokenData = await auth.api.getToken({
      headers: reqHeaders,
    });
    return tokenData?.token || null;
  } catch (error) {
    console.error("Failed to get token from server:", error);
    return null;
  }
};