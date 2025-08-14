import { useEffect } from "react";
import type { EmblemContextOptions } from "../useEmblemContext";

// We only want to assert the external stylesheet if the emblem is intended to be shown live
function loadPicoCss() {
	const link = document.createElement("link");
	link.rel = "stylesheet";
	link.href = "https://cdn.jsdelivr.net/npm/@picocss/pico@2/css/pico.min.css";
	// Ensure we don't override any bundled css via ordering
	document.head.insertBefore(link, document.head.firstChild);
}

export default function getUrlSettings(appRoot: HTMLElement) {
	const params = new URLSearchParams(window.location.href.split("?")[1]);

	const background = params.get("bg");

	if (background) {
		appRoot.style.setProperty("--background", background);
	}

	const truthy = ["true", "1"];
	const fallbackSize = document.body.clientWidth < 600 ? "312px" : "512px";
	const hideOptions = truthy.includes(params.get("hideOpts")!) || false;

	if (!hideOptions) {
		// load in pico styles
		loadPicoCss();
	}

	const initialValues = {
		size: params.get("size") || fallbackSize,
		isSpinning: truthy.includes(params.get("spin")!) || false,
		hideWater: truthy.includes(params.get("hideWater")!) || false,
		animationStage: ["loading", "final"].includes(params.get("initStage")!)
			? (params.get(
					"initStage"
			  ) as EmblemContextOptions["animationStage"])
			: null,
	};

	return { initialValues, hideOptions };
}

/**
 * React hook to listen for postMessage events to set the eai:size state.
 * @example window.postMessage({ type: "eai:size", value: "400px" }, "*");
 */
export function useLiveListener(
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
