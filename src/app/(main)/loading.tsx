import { UpdateIcon } from "@radix-ui/react-icons";

export default function Loading() {
	return (
		<div className="flex justify-center flex-col items-center h-screen">
			<UpdateIcon className="animate-spin" />
		</div>
	);
}
