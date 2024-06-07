import { getSchoology } from "@/lib/schoology";
import type { NextRequest } from "next/server";

export async function GET(req: NextRequest, { params }: { params: { slug: string[] } }) {
	const schoology = getSchoology();
	const res = await schoology(`/${params.slug.join("/")}?${req.nextUrl.searchParams.toString()}`);
	return Response.json(res);
}
