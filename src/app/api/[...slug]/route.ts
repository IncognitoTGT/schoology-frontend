import { getSchoology } from "@/lib/schoology";
import type { NextRequest } from "next/server";

export const GET = (req: NextRequest, { params }: { params: { slug: string[] } }) =>
	getSchoology()(`/${params.slug.join("/")}?${req.nextUrl.searchParams.toString()}`, {
		returns: "response",
		method: "GET",
	});
export const POST = (req: NextRequest, { params }: { params: { slug: string[] } }) =>
	getSchoology()(`/${params.slug.join("/")}?${req.nextUrl.searchParams.toString()}`, {
		returns: "response",
		method: "POST",
		body: req.body,
	});
