import { signOut } from "@/actions/accounts";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { getSchoology } from "@/lib/schoology";
import type { Credentials } from "@/types/cookies";
import { CrossCircledIcon } from "@radix-ui/react-icons";
import { cookies } from "next/headers";
import { redirect, unstable_rethrow } from "next/navigation";
import DistrictDialog from "./page.client";

export default function Index({
	searchParams,
}: {
	searchParams: { [key: string]: string | string[] | undefined };
}) {
	const { error } = searchParams;
	const creds = cookies().get("credentials")?.value;
	if (creds) {
		const parsedCreds: Credentials = JSON.parse(creds);
		if (parsedCreds.cKey && parsedCreds.cSecret) redirect("/home");
	}
	return (
		<main className="flex h-full justify-center items-center">
			<Card className="flex size-96 flex-col">
				<CardHeader>
					<CardTitle>Log into Schoology</CardTitle>
					<CardDescription>
						<DistrictDialog>
							<button type="button">Click here to obtain credentials.</button>
						</DistrictDialog>
					</CardDescription>
				</CardHeader>
				<CardContent className="flex flex-col gap-2">
					{error ? (
						<Alert variant="destructive" className="w-full text-destructive">
							<CrossCircledIcon className="h-4 w-4" />
							<AlertTitle>Error logging in:</AlertTitle>
							<AlertDescription>{error}</AlertDescription>
						</Alert>
					) : null}
					<form
						className="flex flex-col gap-2 w-full"
						action={async (data: FormData) => {
							"use server";
							const cKey = data.get("cKey")?.toString();
							const cSecret = data.get("cSecret")?.toString();
							if (cKey && cSecret) {
								cookies().set("credentials", JSON.stringify({ cKey, cSecret } as Credentials));
								const schoology = getSchoology();
								const req = await schoology("/app-user-info");
								if (req.error) {
									return signOut(undefined, req.error);
								}
								cookies().set("userId", req.api_uid);
								return redirect("/home");
							}
						}}
					>
						<Label htmlFor="cKey">Consumer key</Label>
						<Input name="cKey" id="cKey" type="text" placeholder="xxxxxxxxxx" />
						<Label htmlFor="cSecret">Consumer secret</Label>
						<Input name="cSecret" id="cSecret" type="password" placeholder="***********" />
						<Button type="submit">Save</Button>
					</form>
				</CardContent>
			</Card>
		</main>
	);
}
