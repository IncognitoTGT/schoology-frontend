
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import DistrictDialog from "./page.client";
import { cookies } from "next/headers";

export default function Index() {
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
				<CardContent>
					<form action={(data: FormData) => {
						const cKey = data.get("cKey")?.toString()
						const cSecret = data.get("cSecret")?.toString()
						if (cKey && cSecret) {
							cookies().set("credentials", JSON.stringify({ cKey, cSecret }));
							return {success: true, message: "Credentials saved"}
						}
						return {success: false, message: "Invalid credentials"}
					}}>
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
