import type { Credentials } from "@/types/cookies";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import OAuth from "oauth-1.0a";
/**
 * @param contentType Request path
 **/
export type SchoologyRequestInit = RequestInit & {
	contentType?: string | undefined;
	returns?: "json" | "text" | "blob" | "response";
};
/**
 * @param path Request path
 * @param options Request options
 * @returns The response from the API, either as a JSON object or an error message
 */
export type SchoologyInstance = (path: string, options?: SchoologyRequestInit | undefined) => Promise<any>;
export function getSchoology(): SchoologyInstance {
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
	const headers = (contentType?: string | undefined) => ({
		"Content-Type": contentType || "application/json",
		Accept: "application/json",
		...oauth.toHeader(oauth.authorize({ url: "https://api.schoology.com", method: "GET" })),
	});
	return (async (path: string, { contentType, returns, ...options }: SchoologyRequestInit | undefined = {}) => {
		const responseOpts = (): RequestInit => ({
			...options,
			headers: headers(contentType),
		});
		let res = await fetch(`https://api.schoology.com/v1${path}`, responseOpts());
		if (res.status === 429) {
			await new Promise((resolve) => setTimeout(resolve, 2000));
			res = await fetch(`https://api.schoology.com/v1${path}`, responseOpts());
		}
		if ([401, 403].includes(res.status)) {
			return { error: await res.text() };
		}
		if (returns === "response") {
			return res;
		}
		return res[returns || "json"]();
	}) as SchoologyInstance;
}
