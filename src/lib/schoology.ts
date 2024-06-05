import type { Credentials } from "@/types/cookies";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";

export function getSchoology() {
	const authCookie = cookies().get("credentials");
	const { cKey, cSecret }: Credentials = JSON.parse(authCookie?.value as string);
	if (!cKey || !cSecret) return redirect("/")
	return async (path: string) =>
		(
			await fetch(`https://api.schoology.com/v1${path}`, {
				headers: {
					"Content-Type": "application/json",
					Accept: "application/json",
					Authorization: `OAuth realm="Schoology%20API",oauth_consumer_key="${cKey}",oauth_signature_method="PLAINTEXT",oauth_timestamp="${Math.floor(
						Date.now() / 1000,
					)}",oauth_nonce="${
						Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
					}",oauth_version="1.0",oauth_signature="${cSecret}%26"`,
				},
			})
		).json();
}
