import { getSchoology } from "@/lib/schoology";
import type { NextRequest } from "next/server";

export const GET = async (req: NextRequest, { params }: { params: { slug: string[] } }) =>
	getSchoology()(`/${params.slug.join("/")}?${req.nextUrl.searchParams.toString()}`, {
		returns: "response",
		method: "GET",
		contentType: req.headers.get("content-type") || "application/json",
	});
export const POST = async (req: NextRequest, { params }: { params: { slug: string[] } }) =>
	getSchoology()(`/${params.slug.join("/")}?${req.nextUrl.searchParams.toString()}`, {
		returns: "response",
		method: "POST",
		body: req.body,
		contentType: req.headers.get("content-type") || "application/json",
	});
