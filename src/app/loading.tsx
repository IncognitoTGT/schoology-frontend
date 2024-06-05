import { Pencil1Icon } from "@radix-ui/react-icons";
export default function HydrateFallback() {
	return (
		<div className="flex justify-center items-center h-screen">
			<Pencil1Icon className="size-16 animate-pulse" />
		</div>
	);
}
