import { render } from "@testing-library/react"
import { PageLink } from "./PageLink"

test("active link renders correctly", () => {
    // Arrange
    const { debug } = render(<PageLink href="/" />)

    debug()
})