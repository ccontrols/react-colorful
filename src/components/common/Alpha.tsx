import React from "react";

import { Interactive, Interaction } from "./Interactive";
import { Pointer } from "./Pointer";

import { hsvaToHslaString } from "../../utils/convert";
import { formatClassName } from "../../utils/format";
import { clamp } from "../../utils/clamp";
import { HsvaColor } from "../../types";

import styles from "../../css/styles.css";

interface Props {
  className?: string;
  hsva: HsvaColor;
  onChange: (newAlpha: { a: number }) => void;
}

export const Alpha = ({ className, hsva, onChange }: Props): JSX.Element => {
  const handleMove = (interaction: Interaction) => {
    onChange({ a: interaction.left });
  };

  const handleKey = (offset: Interaction) => {
    // Alpha always fit into [0, 1] range
    onChange({ a: clamp(hsva.a + offset.left) });
  };

  // We use `Object.assign` instead of the spread operator
  // to prevent adding the polyfill (about 150 bytes gzipped)
  const colorFrom = hsvaToHslaString(Object.assign({}, hsva, { a: 0 }));
  const colorTo = hsvaToHslaString(Object.assign({}, hsva, { a: 1 }));

  const gradientStyle = {
    backgroundImage: `linear-gradient(90deg, ${colorFrom}, ${colorTo})`,
  };

  const nodeClassName = formatClassName([
    "react-colorful__alpha",
    styles.alpha,
    styles.alphaPattern,
    className,
  ]);

  const pointerClassName = formatClassName(["react-colorful__alpha-pointer", styles.alphaPattern]);

  return (
    <div className={nodeClassName}>
      <div className={styles.alphaGradient} style={gradientStyle} />
      <Interactive
        onMove={handleMove}
        onKey={handleKey}
        aria-label="Alpha"
        aria-valuetext={`${Math.round(hsva.a * 100)}%`}
      >
        <Pointer className={pointerClassName} left={hsva.a} color={hsvaToHslaString(hsva)} />
      </Interactive>
    </div>
  );
};
