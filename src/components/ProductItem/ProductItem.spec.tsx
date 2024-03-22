import { render, fireEvent } from "@testing-library/react";
import { ProductItem } from ".";
import { Coffees } from "../../utils/coffees";
describe("ProductItem Component", () => {
  it("should render componet", () => {
    const mockedData = Coffees[0];
    const { getByText } = render(
      <ProductItem
        description={mockedData.description}
        image={mockedData.image}
        name={mockedData.name}
        price={mockedData.price}
        tags={[]}
        key={`productItem-${mockedData.name}-0`}
      />
    );

    expect(getByText(mockedData.name)).toBeTruthy();
  });
  it("should be able to add +1 to item when plus button is clicked", () => {
    const mockedData = Coffees[0];
    const { getByTestId } = render(
      <ProductItem
        description={mockedData.description}
        image={mockedData.image}
        name={mockedData.name}
        price={mockedData.price}
        tags={[]}
        key={`productItem-${mockedData.name}-1`}
      />
    );

    const amount = getByTestId("amount");
    expect(amount.textContent).toBe("1");
    const plusBtn = getByTestId("plus-btn");
    fireEvent.click(plusBtn);
    expect(amount.textContent).toBe("2");
  });
  it("should be able to add -1 to item when minus button is clicked", () => {
    const mockedData = Coffees[0];
    const { getByTestId } = render(
      <ProductItem
        description={mockedData.description}
        image={mockedData.image}
        name={mockedData.name}
        price={mockedData.price}
        tags={[]}
        key={`productItem-${mockedData.name}-2`}
      />
    );

    const amount = getByTestId("amount");
    expect(amount.textContent).toBe("1");
    const minusBtn = getByTestId("minus-btn");
    const plusBtn = getByTestId("plus-btn");

    fireEvent.click(plusBtn);
    expect(amount.textContent).toBe("2");

    fireEvent.click(minusBtn);
    expect(amount.textContent).toBe("1");
  });
});
