"use client";
export default function SupressLogs() {
	const prevConsoleError = console.error;
	const prevConsoleWarn = console.warn;

	console.error = (...args) => {
		if (args[0].includes("Warning: Accessing element.ref")) {
			return;
		}

		prevConsoleError(...args);
	};

	console.warn = (...args) => {
		if (args[0].includes("Warning: Accessing element.ref")) {
			return;
		}

		prevConsoleWarn(...args);
	};

	return null;
}
