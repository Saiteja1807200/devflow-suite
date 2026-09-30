import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { StatCard } from "./StatCard";

describe("StatCard", () => {
  it("renders the metric label and value", () => {
    render(<StatCard label="Active projects" value="24" delta="+12%" icon={<span>i</span>} />);
    expect(screen.getByText("Active projects")).toBeInTheDocument();
    expect(screen.getByText("24")).toBeInTheDocument();
  });
});