"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function signOut(_data?: FormData | undefined, error?: string) {
	cookies().delete("credentials");
	cookies().delete("userId");
	redirect(`/${error ? `?error=${error}` : ""}`);
}
