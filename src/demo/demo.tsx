import "./demo.scss";

import { createRoot } from "react-dom/client";
import { Fragment, useState } from "react";
import { toSvg, toPng } from "html-to-image";

import { type EmblemContextOptions } from "../useEmblemContext";
import Emblem from "../Emblem";

// When we re-init, we want to force a reconcile of the entire react-tree
// useful for animation re-init
const newRandomKey = () => Math.random().toString(16);

async function createAndSaveLogo(isBitmap?: boolean) {
	const logo = document.querySelector<HTMLDivElement>(".eai-emblem")!;
	// const planetRef = logo.querySelector("canvas")!;

	const output = isBitmap ? await toPng(logo) : await toSvg(logo);

	const extension = isBitmap ? "png" : "svg";
	const fileName = `logo.${extension}`;
	const link = document.createElement("a");

	link.href = output;
	link.download = fileName;
	link.click();
}

const initialSize = document.body.clientWidth < 600 ? "312px" : "512px";

function EmblemDemoApp() {
	const [logoKey, setLogoKey] = useState("");
	const [size, setSize] = useState(initialSize);
	const [isSpinning, setIsSpinning] = useState(false);
	const [animationStage, setAnimationStage] =
		useState<EmblemContextOptions["animationStage"]>(null);

	const allSpinningValues = [true, false] as const;

	const allAnimationStages = [
		"loading",
		"final",
		null,
	] as EmblemContextOptions["animationStage"][];

	// Group this on it's own, so it's more organized/contained from the actual component
	const controls = (
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
					allSpinningValues,
					setIsSpinning,
					isSpinning
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
	);

	return (
		<>
			<Emblem
				key={logoKey}
				size={size}
				isSpinning={isSpinning}
				animationStage={animationStage}
			/>
			{controls}
		</>
	);
}

function renderRadioOptions<T extends readonly unknown[]>(
	values: T,
	setValue: (value: T[number]) => void,
	selectedValue: T[number]
) {
	return values.map((value) => {
		const key = `item-${value}`;

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

createRoot(document.getElementById("app")!).render(<EmblemDemoApp />);
