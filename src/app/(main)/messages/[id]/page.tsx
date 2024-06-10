import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { TooltipContent, TooltipTrigger, Tooltip } from "@/components/ui/tooltip";
import { md5 } from "js-md5";
import { getSchoology } from "@/lib/schoology";
import { DownloadIcon, FileIcon, Link1Icon, PaperPlaneIcon } from "@radix-ui/react-icons";
import { revalidatePath } from "next/cache";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Fragment } from "react";
export default async function Page({ params }: { params: { id: string } }) {
	const schoology = getSchoology();
	const { message: messages }: { message: any[] } = await schoology(
		`/messages/inbox/${params.id}?with_attachments=TRUE`,
	).catch(() => notFound());
	const messageRecipients: any[] = (
		await schoology("/multiget", {
			method: "POST",
			contentType: "text/xml",
			body: `<?xml version="1.0" encoding="utf-8" ?><requests>${messages[0].recipient_ids
				.split(",")
				.map((recipient: number) => `<request>/v1/users/${recipient}</request>`)}</requests>`,
		})
	).response.map((response: any) => response.body);

	return (
		<main className="flex h-full flex-col text-wrap mb-4">
			<section className="flex items-center justify-start mt-4 ml-12 pt-4 pb-4">
				<h1 className="text-4xl font-bold">Message</h1>
			</section>
			<Card className="h-auto w-[80%] flex flex-col justify-center ml-12">
				<CardHeader>
					<CardTitle className="truncate">{messages[0].subject}</CardTitle>
					<CardDescription>
						Recipients: {messageRecipients.map((recipient) => decodeURIComponent(recipient.name_display)).join(", ")}
					</CardDescription>
				</CardHeader>
				<CardContent className="flex flex-col items-center justify-start gap-2">
					{messages.map((message, index) => (
						<Fragment key={message.id}>
							<div className="h-auto w-full flex flex-col justify-start">
								<CardHeader>
									<CardTitle className="truncate flex gap-2 items-center">
										<Image
											src={messageRecipients.find((val) => val.id === message.author_id).picture_url}
											alt="profile"
											width={170}
											height={170}
											className="rounded-full aspect-square bg-cover bg-center object-cover size-4 inline"
										/>
										{messageRecipients.find((val) => val.id === message.author_id).name_display}
									</CardTitle>
									<CardDescription>{new Date(message.last_updated * 1000).toLocaleString()}</CardDescription>
								</CardHeader>
								<CardContent>{message.message}</CardContent>
								{message.attachments ? (
									<CardFooter className="gap-2">
										{message.attachments.links?.link.map((link: any) => (
											<a key={link.id} href={link.url} target="_blank" rel="noreferrer">
												<Card key={link.id} className="hover:bg-secondary/70">
													<CardHeader>
														<CardTitle className="truncate flex gap-2 items-center">
															<Link1Icon className="size-5 flex-shrink-0 inline" />
															{link.title}
														</CardTitle>
														<CardDescription>{link.url}</CardDescription>
													</CardHeader>
												</Card>
											</a>
										))}
										{message.attachments.files?.file
											? message.attachments.files.file.map((file: any) => (
													<Card key={file.id} className="flex justify-start items-center p-4 h-16 w-auto gap-4">
														<FileIcon className="size-5 flex-shrink-0" />
														<span className="text-sm truncate overflow-x-scroll">{file.filename}</span>
														<Button size="icon" className="flex-shrink-0" asChild>
															<a download={file.filename} href={`/api${file.download_path.split("v1")[1]}`}>
																<DownloadIcon className="size-4" />
															</a>
														</Button>
													</Card>
												))
											: null}
									</CardFooter>
								) : null}
							</div>
							{index >= 0 && index !== messages.length - 1 ? <Separator /> : null}
						</Fragment>
					))}
					<form
						action={async (data: FormData) => {
							"use server";
							const message = data.get("message")?.toString();
							const file = data.get("file") as File | null;
							const schoology = getSchoology();
							let upload: any;
							if (file) {
								const uploadReq = await schoology("/upload", {
									method: "POST",
									body: JSON.stringify({
										filename: file.name,
										filesize: file.size,
										md5_checksum: md5(await file.arrayBuffer()),
									}),
								});
								upload = await schoology(uploadReq.result.upload_location.split("v1")[1], {
									method: "PUT",
									body: await file.arrayBuffer(),
									contentType: file.type,
								});
							}
							if (message) {
								await schoology(`/messages/${params.id}`, {
									method: "POST",
									body: JSON.stringify({
										subject: messages[0].subject,
										message,
										recipient_ids: messages[0].recipient_ids,
										"file-attachment": upload
											? {
													id: [upload.id],
												}
											: undefined,
									}),
								});
							}

							revalidatePath("/messages");
						}}
						className="relative overflow-hidden rounded-lg border bg-background focus-within:ring-1 focus-within:ring-ring w-full"
					>
						<Label htmlFor="message" className="sr-only">
							Message
						</Label>
						<Textarea
							name="message"
							id="message"
							placeholder="Type your message here..."
							className="min-h-12 resize-none border-0 p-3 shadow-none focus-visible:ring-0"
						/>
						<div className="flex items-center p-3 pt-0">
							<Tooltip>
								<TooltipTrigger asChild>
									<Button variant="ghost" size="icon" asChild>
										<Label htmlFor="file">
											<Link1Icon className="size-4" />
											<span className="sr-only">Attach file</span>
										</Label>
									</Button>
								</TooltipTrigger>
								<TooltipContent side="top">Attach File</TooltipContent>
							</Tooltip>
							<input hidden type="file" id="file" name="file" />
							<Button type="submit" size="sm" className="ml-auto gap-1.5">
								Send Message
								<PaperPlaneIcon className="size-3.5" />
							</Button>
						</div>
					</form>
				</CardContent>
			</Card>
		</main>
	);
}
