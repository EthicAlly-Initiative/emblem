import React, { useContext, createContext, useMemo, useState } from "react";

export interface EmblemContextOptions {
	animationStage?: "loading" | "final" | null;
	isSpinning?: boolean | null;
	hideWater?: boolean | null;
}

function useEmblemContextProviderValue(config: EmblemContextOptions) {
	const [isReady, setIsReady] = useState(false);

	return useMemo(() => {
		return {
			...config,
			isReady,
			setIsReady,
		};
	}, [config.animationStage, config.isSpinning, config.hideWater, isReady]);
}

type EmblemContextValueType = ReturnType<typeof useEmblemContextProviderValue>;

const EmblemContext = createContext<EmblemContextValueType | null>(null);

export default function useEmblemContext() {
	return useContext(EmblemContext)!;
}

export function EmblemContextProvider({
	children,
	options,
}: {
	children: React.ReactNode;
	options: EmblemContextOptions;
}) {
	const value = useEmblemContextProviderValue(options);

	return (
		<EmblemContext.Provider value={value}>
			{children}
		</EmblemContext.Provider>
	);
}
