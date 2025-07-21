import React, { useContext, createContext, useMemo } from "react";

export interface EmblemContextOptions {
	animationStage?: "loading" | "final" | null;
	isSpinning?: boolean | null;
}

function useEmblemContextProviderValue(config: EmblemContextOptions) {
	return useMemo(() => {
		return {
			...config,
		};
	}, [config.animationStage, config.isSpinning]);
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
