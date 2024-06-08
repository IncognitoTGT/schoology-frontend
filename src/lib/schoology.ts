import type { Credentials } from "@/types/cookies";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import OAuth from "oauth-1.0a";

export function getSchoology() {
	const authCookie = cookies().get("credentials");
	if (!authCookie) return redirect("/");
	const { cKey, cSecret }: Credentials = JSON.parse(authCookie.value);
	if (!cKey || !cSecret) return redirect("/");
	const oauth = new OAuth({
		consumer: { key: cKey, secret: cSecret },
		signature_method: "PLAINTEXT",
		realm: "Schoology API",
		hash_function: (_base_string, key) => key,
	});
	const headers = () => ({
		"Content-Type": "application/json",
		Accept: "application/json",
		...oauth.toHeader(oauth.authorize({ url: "https://api.schoology.com", method: "GET" })),
	});
	return async (path: string, method?: "GET" | "POST" | "PUT" | "PATCH" | "DELETE" | "OPTIONS" | undefined) => {
		const res = await fetch(`https://api.schoology.com/v1${path}`, {
			method,
			headers: headers(),
		});
		if (res.redirected) {
			return (
				await fetch(res.url, {
					method,
					headers: headers(),
				})
			).json();
		}
		return res.json();
	};
}
