import React, { useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { FaCheck } from "react-icons/fa";
import { useCartContext } from "../context/cart_context";
import AmountButtons from "./AmountButtons";

const AddToCart = ({ product }) => {
  const { addToCart } = useCartContext();
  const { id, stock, colors, sizes } = product;
  const [mainColor, setMainColor] = useState(colors[0]);
  const [mainSize, setMainSize] = useState(sizes[0]);
  console.log(sizes);
  const [amount, setAmount] = useState(1);
  const increase = () => {
    setAmount((currentAmount) => {
      if (stock > currentAmount) {
        return currentAmount + 1;
      } else {
        return currentAmount;
      }
    });
  };

  const decrease = () => {
    setAmount((currentAmount) => {
      if (currentAmount > 1) {
        return currentAmount - 1;
      } else {
        return currentAmount;
      }
    });
  };

  return (
    <Wrapper>
      <div className="colors">
        <span>colors</span>
        <div>
          {colors.map((color, index) => {
            return (
              <button
                key={index}
                onClick={() => {
                  setMainColor(color);
                }}
                className={`${
                  mainColor === color ? "color-btn active" : "color-btn"
                }`}
                style={
                  color === "#ffffff"
                    ? {
                        border: "1px solid",
                        borderColor: "#222",
                        background: "transparent",
                      }
                    : { background: color }
                }
              >
                {mainColor === color && color !== "#ffffff" ? (
                  <FaCheck />
                ) : mainColor === color && color === "#ffffff" ? (
                  <FaCheck style={{ color: "green" }} />
                ) : null}
                {/* {mainColor === color ? <FaCheck /> : null} */}
              </button>
            );
          })}
        </div>
      </div>
      <div className="sizes">
        <span>sizes</span>
        <div>
          {sizes.sort().map((size, index) => {
            return (
              <button
                key={index}
                onClick={() => {
                  setMainSize(size);
                }}
                className={`${
                  mainSize === size ? "size-btn s-active" : "size-btn"
                }`}
                style={{ background: size }}
              >
                {size}
              </button>
            );
          })}
        </div>
      </div>
      <div className="btn-container">
        <AmountButtons
          increase={increase}
          decrease={decrease}
          amount={amount}
        />
        <Link
          to="/cart"
          className="btn add-to-cart"
          onClick={() => {
            return addToCart(id, mainColor, amount, product, mainSize);
          }}
        >
          add to cart
        </Link>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  margin-top: 2rem;
  .colors {
    display: grid;
    grid-template-columns: 125px 1fr;
    align-items: center;
    margin-bottom: 1rem;
    span {
      text-transform: capitalize;
      font-weight: 700;
    }
    div {
      display: flex;
    }
  }
  .sizes {
    display: grid;
    grid-template-columns: 125px 1fr;
    align-items: center;
    margin-bottom: 1rem;
    span {
      text-transform: capitalize;
      font-weight: 700;
    }
    div {
      margin-top: 10px;
      display: grid;
      grid-template-columns: 30px 30px 30px 30px 30px;
      grid-column: 10px;
      column-gap: 10 px;
      gap: 5px;
    }
  }
  .color-btn {
    display: inline-block;
    width: 1.5rem;
    height: 1.5rem;
    border-radius: 50%;
    background: #222;
    margin-right: 0.5rem;
    border: none;
    cursor: pointer;
    opacity: 0.5;
    display: flex;
    align-items: center;
    justify-content: center;
    svg {
      font-size: 0.75rem;
      color: var(--clr-white);
    }
  }
  .size-btn {
    display: inline-block;
    font-size: 0.75rem;
    width: 1.8rem;
    height: 1.8rem;
    border-radius: 50%;
    background: #ffffff;
    margin-right: 0.5rem;
    border: 1px solid transparent;
    border-color: #222;
    cursor: pointer;
    opacity: 0.5;
    display: flex;
    align-items: center;
    justify-content: center;
    svg {
      font-size: 0.75rem;
      color: var(--clr-white);
    }
  }
  .s-active {
    opacity: 1;
    box-shadow: 0px 0px 0px 2px var(--clr-primary-5);
  }
  .active {
    opacity: 1;
  }
  .btn-container {
    margin-top: 2rem;
  }

  .btn {
    margin-top: 1rem;
    width: 140px;
  }
  .add-to-cart {
    text-align: center;
  }
`;
export default AddToCart;
