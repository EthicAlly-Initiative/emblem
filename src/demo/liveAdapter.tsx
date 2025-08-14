import { useEffect } from "react";
import type { EmblemContextOptions } from "../useEmblemContext";

export default function getUrlSettings(appRoot: HTMLElement) {
	const params = new URLSearchParams(window.location.href.split("?")[1]);

	const truthy = ["true", "1"];

	const background = params.get("bg");

	if (background) {
		appRoot.style.setProperty("--background", background);
	}

	const fallbackSize = document.body.clientWidth < 600 ? "312px" : "512px";

	const initialValues = {
		size: params.get("size") || fallbackSize,
		hideOptions: truthy.includes(params.get("hideOpts")!) || false,
		isSpinning: truthy.includes(params.get("spin")!) || false,
	};

	console.log(params.get("size"), initialValues);

	return { initialValues };
}

/**
 * React hook to listen for postMessage events to set the eai:size state.
 * @example window.postMessage({ type: "eai:size", value: "400px" }, "*");
 */
export function useLiveSizeListener(
	setSize: (size: string) => void,
	setAnimationStage: (state: EmblemContextOptions["animationStage"]) => void
) {
	useEffect(() => {
		function handlerIncoming(event: MessageEvent) {
			if (
				event.data.value !== null &&
				typeof event.data.value !== "string"
			) {
				console.error("EAI: Invalid value specified", event.data.value);
				return;
			}

			if (event.data?.type === "eai:size") {
				setSize(event.data.value);
			} else if (event.data?.type === "eai:animationStage") {
				if (!["loading", "final", null].includes(event.data.value)) {
					console.error(
						"EAI: Invalid animationStage specified",
						event.data.value
					);
					return;
				}

				setAnimationStage(event.data.value);
			}
		}

		window.addEventListener("message", handlerIncoming);
		return () => window.removeEventListener("message", handlerIncoming);
	}, [setSize]);
}
