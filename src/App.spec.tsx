import { render, fireEvent, waitFor, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "./App";

describe("Home Component", () => {
  it("should render componet", () => {
    const { getByText } = render(<App key={"App"} />);

    expect(getByText("Nossos Cafés")).toBeTruthy();
  });
});
describe("App Component Integration", () => {
  it("test integration with other components", () => {
    const { getAllByTestId } = render(<App key={"App"} />);

    const amounts = getAllByTestId("amount");
    expect(amounts[0].textContent).toBe("1");
  });
  it("should be able to +1 item when plus button is clicked", () => {
    const { getAllByTestId } = render(<App key={"App"} />);

    const amounts = getAllByTestId("amount");
    expect(amounts[0].textContent).toBe("1");
    const plusBtns = getAllByTestId("plus-btn");
    fireEvent.click(plusBtns[0]);
    expect(amounts[0].textContent).toBe("2");
  });
  it("should be able to -1 item when minus button is clicked", () => {
    const { getAllByTestId } = render(<App key={"App"} />);

    const amounts = getAllByTestId("amount");
    expect(amounts[0].textContent).toBe("1");

    const plusBtns = getAllByTestId("plus-btn");
    const minusBtns = getAllByTestId("minus-btn");

    fireEvent.click(plusBtns[0]);
    expect(amounts[0].textContent).toBe("2");

    fireEvent.click(minusBtns[0]);
    expect(amounts[0].textContent).toBe("1");
  });
  it("should be able to add item to cart when cart button is clicked", () => {
    const { getAllByTestId, getByTestId } = render(<App key={"App"} />);

    const amounts = getAllByTestId("amount");
    expect(amounts[0].textContent).toBe("1");

    const plusBtns = getAllByTestId("plus-btn");
    fireEvent.click(plusBtns[0]);
    expect(amounts[0].textContent).toBe("2");

    const productItemCartBtns = getAllByTestId("product-item-cart-btn");
    fireEvent.click(productItemCartBtns[0]);
    expect(amounts[0].textContent).toBe("1");
  });

  it("should update Badge amount", () => {
    const { getAllByTestId, getByTestId, queryByTestId } = render(
      <App key={"App"} />
    );

    const initialBadge = queryByTestId("cart-badge");
    expect(initialBadge).toBeNull;

    const plusBtns = getAllByTestId("plus-btn");
    fireEvent.click(plusBtns[0]);

    const productItemCartBtns = getAllByTestId("product-item-cart-btn");
    fireEvent.click(productItemCartBtns[0]);

    const badge = getByTestId("cart-badge");
    expect(badge.textContent).toBe("2");
    expect(queryByTestId("cart-badge")?.textContent).toBe("2");
  });
  // it("should navigate to cart", () => {
  //   const { getByPlaceholderText, getByTestId, queryByTestId } = render(
  //     <App key={"App"} />
  //   );

  //   const badge = getByTestId("cart-link");
  //   fireEvent.click(badge);

  //   const cepInput = getByPlaceholderText("CEP");

  //   expect(cepInput).toBeTruthy();
  // });
});
describe("App component flow", () => {
  it("should navigate to cart and get products added to cart", () => {
    const { getAllByTestId, getByTestId, getByPlaceholderText } = render(
      <App key={"App"} />
    );
    const plusBtns = getAllByTestId("plus-btn");
    fireEvent.click(plusBtns[0]);

    const productItemCartBtns = getAllByTestId("product-item-cart-btn");
    fireEvent.click(productItemCartBtns[0]);

    const badge = getByTestId("cart-link");
    fireEvent.click(badge);

    const cartAmount = getAllByTestId("cart-amount");

    expect(cartAmount[0].textContent).toBe("2");
  });
  it("should fill CEP information and Update other textfields", async () => {

    const {} = render(<App key={"App"} />);
    const cepInput = screen.getByPlaceholderText("CEP");
    userEvent.type(cepInput, "60833-012");
    fireEvent.input(cepInput, { target: { value: "60833-012" } });
    fireEvent.blur(cepInput);

    await waitFor(() => {
        expect(screen.getByTestId("input-city")).toHaveValue("Fortaleza");
        expect(screen.getByPlaceholderText("Rua")).toHaveValue("Rua Rangel Pestana");
        expect(screen.getByPlaceholderText("Bairro")).toHaveValue("Sapiranga-Coité");
        expect(screen.getByPlaceholderText("UF")).toHaveValue("CE");
    });
});
});
