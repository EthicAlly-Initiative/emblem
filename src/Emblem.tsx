import React from "react";

import {
	EmblemContextProvider,
	type EmblemContextOptions,
} from "./useEmblemContext";
import People from "./parts/People";
import Planet from "./parts/Planet";

import "./Emblem.scss";

export interface EthicallyEmblemProps extends EmblemContextOptions {
	size: string;
	className?: string;
}

export default function EthicAllyEmblem({
	size,
	className,
	...options
}: EthicallyEmblemProps) {
	// use CSS properties passthrough to change the size from the React-side
	const styles = {
		"--size": size,
	} as React.CSSProperties;

	return (
		<EmblemContextProvider options={options}>
			<div
				className={`eai-emblem${(className && " " + className) || ""}`}
				style={styles}
			>
				<Planet />
				<People />
			</div>
		</EmblemContextProvider>
	);
}
