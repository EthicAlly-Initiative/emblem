import "./demo.scss";

import { createRoot } from "react-dom/client";
import { Fragment, useState } from "react";
import getUrlSettings, { useLiveListener } from "./liveAdapter";

import { type EmblemContextOptions } from "../useEmblemContext";
import Emblem from "../Emblem";

const appRoot = document.getElementById("app")!;
const { initialValues, hideOptions } = getUrlSettings(appRoot);

// When we re-init, we want to force a reconcile of the entire react-tree
// useful for animation re-init
const newRandomKey = () => Math.random().toString(16);

async function createAndSaveLogo(isBitmap?: boolean) {
	const { toSvg, toPng } = await import("html-to-image");
	const logo = document.querySelector<HTMLDivElement>(".eai-emblem")!;
	const output = isBitmap ? await toPng(logo) : await toSvg(logo);

	const extension = isBitmap ? "png" : "svg";
	const fileName = `logo.${extension}`;
	const link = document.createElement("a");

	link.href = output;
	link.download = fileName;
	link.click();
}

function EmblemDemoApp() {
	const [logoKey, setLogoKey] = useState("");
	const [size, setSize] = useState(initialValues.size);
	const [isSpinning, setIsSpinning] = useState(initialValues.isSpinning);
	const [animationStage, setAnimationStage] = useState<
		EmblemContextOptions["animationStage"]
	>(initialValues.animationStage);
	const [hideWater, setHideWater] = useState(initialValues.hideWater);

	const truthyValues = [true, false] as const;

	const allAnimationStages = [
		"loading",
		"final",
		null,
	] as EmblemContextOptions["animationStage"][];

	// Use live frame interactions
	useLiveListener(setSize, setAnimationStage);

	// Group this on it's own, so it's more organized/contained from the actual component
	// Only show when the query param isn't present
	const controls = !hideOptions ? (
		<div className="emblem-controls">
			<button onClick={() => setLogoKey(newRandomKey())}>Reinit</button>
			<button onClick={() => createAndSaveLogo(true)}>Capture PNG</button>
			<button onClick={() => createAndSaveLogo(false)}>
				Capture SVG
			</button>
			<input
				name="size"
				placeholder="Size"
				aria-label="Size"
				value={size}
				onChange={(e) => setSize(e.target.value)}
			/>
			<fieldset>
				<legend>Spinning:</legend>
				{renderRadioOptions(
					truthyValues,
					setIsSpinning,
					isSpinning,
					"spin"
				)}
			</fieldset>
			<fieldset>
				<legend>Hide Water:</legend>
				{renderRadioOptions(
					truthyValues,
					setHideWater,
					hideWater,
					"water"
				)}
			</fieldset>
			<fieldset>
				<legend>Animation Stage:</legend>
				{renderRadioOptions(
					allAnimationStages,
					setAnimationStage,
					animationStage
				)}
			</fieldset>
		</div>
	) : null;

	return (
		<>
			<Emblem
				key={logoKey}
				size={size}
				isSpinning={isSpinning}
				animationStage={animationStage}
				hideWater={hideWater}
			/>
			{controls}
		</>
	);
}

function renderRadioOptions<T extends readonly unknown[]>(
	values: T,
	setValue: (value: T[number]) => void,
	selectedValue: T[number],
	name?: string
) {
	return values.map((value) => {
		const key = `${name || "item"}-${value}`;

		return (
			<Fragment key={key}>
				<input
					type="radio"
					name={key}
					onChange={() => setValue(value)}
					checked={selectedValue === value}
				/>
				<label htmlFor={key}>{`${value}`}</label>
			</Fragment>
		);
	});
}

createRoot(appRoot).render(<EmblemDemoApp />);
