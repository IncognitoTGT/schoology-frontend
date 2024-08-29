// react 19 deprecated element.ref and made it a regular prop but shadcn/ui uses it as a ref
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
