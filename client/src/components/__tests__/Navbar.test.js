import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";

import Navbar from "../Navbar";

let container = null;

beforeEach(() => {
    container = document.createElement("div");
    document.body.appendChild(container);
})

afterEach(() => {
    unmountComponentAtNode(container);
    container.remove();
    container = null;
})

test("back button visible when needed", () => {
    act(() => {
        render(<Navbar back={true} />, container)
    });

    let backButtons = Array.from(container.querySelectorAll(".backButton"));
    expect(backButtons.length).toBe(1)

    act(() => {
        render(<Navbar back={false} />, container)
    });

    backButtons = Array.from(container.querySelectorAll(".backButton"));
    expect(backButtons.length).toBe(0)

})
