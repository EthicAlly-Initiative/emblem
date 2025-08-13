export default function initLiveAdapter(appRoot: HTMLElement) {
	const params = new URLSearchParams(window.location.href.split("?")[1]);

	const truthy = ["true", "1"];

	const background = params.get("bg");

	if (background) {
		appRoot.style.setProperty("--background", background);
	}

	const initialValues = {
		size:
			params.get("size") || document.body.clientWidth < 600
				? "312px"
				: "512px",
		hideOptions: truthy.includes(params.get("hideOpts")!) || false,
		isSpinning: truthy.includes(params.get("spin")!) || false,
	};

	return { initialValues };
}

// TODO: Use cross-origin frame tunneling to control animation state.
