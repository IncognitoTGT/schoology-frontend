import { RocketIcon } from "@radix-ui/react-icons";
export default function HydrateFallback() {
	return (
		<div className="flex justify-center items-center h-screen">
			<RocketIcon className="size-16 animate-pulse" />
		</div>
	);
}
