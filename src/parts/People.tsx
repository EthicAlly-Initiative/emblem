import clsx from "clsx";
import { useMemo } from "react";
import useEmblemContext from "../useEmblemContext";

export default function PeopleSymbol() {
	const { animationStage } = useEmblemContext();

	const isAnimating = Boolean(animationStage);

	const transitionDelay = useMemoizedSet(
		(count) => (isAnimating ? 0.06 * count + "s" : undefined),
		[isAnimating]
	);
	const animationDelay = useMemoizedSet(() => -2 * Math.random() + "s");

	// Because we are animating each part of the rainbow, it's important to make sure that we are only
	// styling the attributes that represent the correct cap markers
	const capMarkers = (
		<defs>
			<marker id="cap" viewBox="-1 -1 2 2" markerWidth="1" orient="auto">
				<circle r="1" fill="context-stroke" />
			</marker>
		</defs>
	);

	return (
		<svg
			className={clsx(
				"eai-emblem__people",
				isAnimating && "eai-emblem__people--animated",
				animationStage == "loading" && "eai-emblem__people--loading",
				animationStage == "final" && "eai-emblem__people--final"
			)}
			viewBox="0 0 52.916665 52.916666"
		>
			{capMarkers}
			<path
				style={{
					fill: "none",
					stroke: "#ffffff",
					strokeWidth: 2,
					transitionDelay: transitionDelay(),
					animationDelay: animationDelay(),
				}}
				markerStart="url(#cap)"
				id="path3"
				d="M 44.58449,18.005969 A 20,20 0 0 1 38.863226,42.146503"
			/>
			<path
				style={{
					fill: "none",
					stroke: "#63c2ee",
					strokeWidth: 2,
					transitionDelay: transitionDelay(),
					animationDelay: animationDelay(),
				}}
				markerEnd="url(#cap)"
				id="path5"
				d="M 14.053715,42.146719 A 20,20 0 0 1 8.3321785,18.005968"
			/>
			<path
				style={{
					fill: "none",
					stroke: "#ff92c3",
					strokeWidth: 2,
					transitionDelay: transitionDelay(),
					animationDelay: animationDelay(),
				}}
				id="path4"
				d="m 38.863226,42.146503 a 20,20 0 0 1 -24.809511,2.16e-4"
			/>
			<path
				style={{
					fill: "none",
					stroke: "#66370d",
					strokeWidth: 2,
					transitionDelay: transitionDelay(),
					animationDelay: animationDelay(),
				}}
				markerStart="url(#cap)"
				id="path7"
				d="M 46.397105,17.160732 A 22,22 0 0 1 45.012946,38.278925"
			/>
			<path
				style={{
					fill: "none",
					stroke: "#000000",
					strokeWidth: 2,
					transitionDelay: transitionDelay(),
					animationDelay: animationDelay(),
				}}
				id="path8"
				d="M 45.012946,38.278925 A 22,22 0 0 1 26.458334,48.458334"
			/>
			<path
				style={{
					fill: "none",
					stroke: "#0056ad",
					strokeWidth: 2,
					transitionDelay: transitionDelay(),
					animationDelay: animationDelay(),
				}}
				markerEnd="url(#cap)"
				id="path13"
				d="M 7.9037227,38.278926 A 22,22 0 0 1 6.519563,17.160732"
			/>
			<path
				style={{
					fill: "none",
					stroke: "#ae0c93",
					strokeWidth: 2,
					transitionDelay: transitionDelay(),
					animationDelay: animationDelay(),
				}}
				id="path10"
				d="M 26.458334,48.458334 A 22,22 0 0 1 7.9037227,38.278926"
			/>
			<path
				style={{
					fill: "none",
					stroke: "#1abd30",
					strokeWidth: 2,
					transitionDelay: transitionDelay(),
					animationDelay: animationDelay(),
				}}
				markerStart="url(#cap)"
				id="path14"
				d="M 48.209721,16.315496 A 24,24 0 0 1 46.699729,39.353525"
			/>
			<path
				style={{
					fill: "none",
					stroke: "#fff001",
					strokeWidth: 2,
					strokeLinejoin: "round",
					transitionDelay: transitionDelay(),
					animationDelay: animationDelay(),
				}}
				id="path15"
				d="M 46.699729,39.353525 A 24,24 0 0 1 26.458334,50.458334"
			/>
			<path
				style={{
					fill: "none",
					stroke: "#fe0002",
					strokeWidth: 2,
					strokeLinejoin: "round",
					transitionDelay: transitionDelay(),
					animationDelay: animationDelay(),
				}}
				markerEnd="url(#cap)"
				id="path17"
				d="M 6.2169399,39.353526 A 24,24 0 0 1 4.7069471,16.315496"
			/>
			<path
				style={{
					fill: "none",
					stroke: "#ff7701",
					strokeWidth: 2,
					strokeLinejoin: "round",
					transitionDelay: transitionDelay(),
					animationDelay: animationDelay(),
				}}
				id="path16"
				d="M 26.458334,50.458334 A 24,24 0 0 1 6.2169399,39.353526"
			/>
		</svg>
	);
}

/**
 * Allows us to seed a set of generated values, but regenerate them when we need them
 * namely used for spread animations (consistent per render)
 */
function useMemoizedSet<T = unknown>(
	functionToRun: (count: number) => T,
	deps: unknown[] = []
) {
	// Recompute when the provided deps change
	const calculatedValues = useMemo<T[]>(() => [], deps);

	// We mutate this in the render loop (for linear calc)
	let currentCount = 0;

	// Return the incrementor
	return () => {
		if (typeof calculatedValues[currentCount] !== "undefined") {
			// return the memoized value
			currentCount += 1;
			return calculatedValues[currentCount];
		}

		calculatedValues[currentCount] = functionToRun(currentCount);
		currentCount += 1;
		return calculatedValues[currentCount - 1];
	};
}
