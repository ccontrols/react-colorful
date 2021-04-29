import * as path from "path";
import { run, AxeResults } from "axe-core";
import { reactRunDOM } from "@component-controls/test-renderers";
import "@component-controls/jest-axe-matcher";
import { loadConfigurations } from "@component-controls/config";
import { renderExample } from "@component-controls/test-renderers";
import { render, act } from "@testing-library/react";
import { renderErr } from "@component-controls/test-renderers";

import doc, { Hex, Rgb } from "./../docs/src/common/ColorColorPicker.stories";

describe("ColorColorPicker", () => {
  const configPath = path.resolve(__dirname, "../docs");
  const config = loadConfigurations(configPath);

  describe("Hex", () => {
    const example = Hex;

    let rendered;
    act(() => {
      rendered = renderExample({
        example,
        doc,
        config
      });
    });
    if (!rendered) {
      renderErr();
      return;
    }
    it("snapshot", () => {
      const { asFragment } = render(rendered);
      expect(asFragment()).toMatchSnapshot();
    });
    it("accessibility", async () => {
      const axeResults = await reactRunDOM<AxeResults>(rendered, run);
      expect(axeResults).toHaveNoAxeViolations();
    });
  });

  describe("Rgb", () => {
    const example = Rgb;

    let rendered;
    act(() => {
      rendered = renderExample({
        example,
        doc,
        config
      });
    });
    if (!rendered) {
      renderErr();
      return;
    }
    it("snapshot", () => {
      const { asFragment } = render(rendered);
      expect(asFragment()).toMatchSnapshot();
    });
    it("accessibility", async () => {
      const axeResults = await reactRunDOM<AxeResults>(rendered, run);
      expect(axeResults).toHaveNoAxeViolations();
    });
  });
});
