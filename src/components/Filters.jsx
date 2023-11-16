import React from "react";
import styled from "styled-components";
import { useFilterContext } from "../context/filter_context";
import { getUniqueValues, formatPrice } from "../utils/helpers";
import { FaCheck } from "react-icons/fa";

const Filters = () => {
  const {
    filters: {
      text,
      category,
      company,
      color,
      shipping,
      min_price,
      price,
      max_price,
    },
    clearFilters,
    updateFilters,
    all_products,
  } = useFilterContext();

  const categories = getUniqueValues(all_products, "category");
  const companies = getUniqueValues(all_products, "company");
  const colors = getUniqueValues(all_products, "colors");

  return (
    <Wrapper>
      <div className="content">
        <form onSubmit={(e) => e.preventDefault()}>
          {/* search input */}
          <div className="form-control">
            <input
              type="text"
              name="text"
              placeholder="search"
              className="search-input"
              value={text}
              onChange={updateFilters}
            />
          </div>
          {/* end of search input */}
          {/* Categories */}
          <div className="form-control">
            <h5>category</h5>
            <div>
              {categories.map((c, index) => {
                return (
                  <button
                    key={index}
                    onClick={updateFilters}
                    name="category"
                    type="button"
                    value={c}
                    className={`${category === c.toLowerCase() && "active"}`}
                  >
                    {c}
                  </button>
                );
              })}
            </div>
          </div>
          {/* End of categories */}
          {/* Companies */}
          <div className="form-control">
            <h5>Company</h5>
            <select
              name="company"
              value={company}
              onChange={updateFilters}
              className="company"
            >
              {companies.map((c, index) => {
                return (
                  <option value={c} key={index}>
                    {c}
                  </option>
                );
              })}
            </select>
          </div>
          {/* End of companies */}
          {/* Colors */}
          <div className="form-control">
            <h5>Colors</h5>
            <div className="colors">
              {colors.slice(0, 6).map((c, index) => {
                if (c === "all") {
                  return (
                    <button
                      key={index}
                      name="color"
                      onClick={updateFilters}
                      value={c}
                      className={`all-btn ${color === c && "active"}`}
                    >
                      {c}
                    </button>
                  );
                }
                return (
                  <button
                    key={index}
                    name="color"
                    type="button"
                    onClick={updateFilters}
                    value={c}
                    style={{ background: c }}
                    className={`color-btn ${color === c && "active"}`}
                  >
                    {color === c ? <FaCheck /> : null}
                  </button>
                );
              })}
            </div>
            {/* ... */}
            <div className="colors">
              {colors.slice(6, 12).map((c, index) => {
                return (
                  <button
                    key={index}
                    name="color"
                    type="button"
                    onClick={updateFilters}
                    value={c}
                    style={
                      c === "#ffffff"
                        ? {
                            border: "1px solid",
                            borderColor: "#222",
                            background: "transparent",
                          }
                        : { background: c }
                    }
                    className={`color-btn ${color === c && "active"}`}
                  >
                    {color === c && c !== "#ffffff" ? (
                      <FaCheck />
                    ) : color === c && c === "#ffffff" ? (
                      <FaCheck style={{ color: "green" }} />
                    ) : null}
                  </button>
                );
              })}
            </div>
            {/* ... */}
          </div>
          {/* End of colors */}
          {/* Price */}
          <div className="form-control">
            <h5>Price</h5>
            <p className="price">{formatPrice(price)}</p>
            <input
              type="range"
              name="price"
              onChange={updateFilters}
              min={min_price}
              max={max_price}
              value={price}
            />
          </div>
          {/* End of price */}
          {/* Shipping */}
          <div className="form-control shipping">
            <label htmlFor="shipping">Free shipping</label>
            <input
              type="checkbox"
              name="shipping"
              id="shipping"
              onChange={updateFilters}
              checked={shipping}
            />
          </div>
          {/* End of Shipping */}
        </form>
        <button type="button" className="clear-btn" onClick={clearFilters}>
          Clear filters
        </button>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  .form-control {
    margin-bottom: 1.25rem;
    h5 {
      margin-bottom: 0.5rem;
    }
  }
  .search-input {
    padding: 0.5rem;
    background: var(--clr-grey-10);
    border-radius: var(--radius);
    border-color: transparent;
    letter-spacing: var(--spacing);
  }
  .search-input::placeholder {
    text-transform: capitalize;
  }

  button {
    display: block;
    margin: 0.25em 0;
    padding: 0.25rem 0;
    text-transform: capitalize;
    background: transparent;
    border: none;
    border-bottom: 1px solid transparent;
    letter-spacing: var(--spacing);
    color: var(--clr-grey-5);
    cursor: pointer;
  }
  .active {
    border-color: var(--clr-grey-5);
  }
  .company {
    background: var(--clr-grey-10);
    border-radius: var(--radius);
    border-color: transparent;
    padding: 0.25rem;
  }
  .colors {
    display: flex;
    align-items: center;
    /* display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    gap: 0.2rem;
    align-items: center;
    margin-bottom: 1rem; */
  }
  .color-btn {
    display: inline-block;
    width: 1rem;
    height: 1rem;
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
      font-size: 0.5rem;
      color: var(--clr-white);
      /* color: green; */
    }
  }
  .all-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 0.5rem;
    opacity: 0.5;
  }
  .active {
    opacity: 1;
  }
  .all-btn .active {
    text-decoration: underline;
  }
  .price {
    margin-bottom: 0.25rem;
  }
  .shipping {
    display: grid;
    grid-template-columns: auto 1fr;
    align-items: center;
    text-transform: capitalize;
    column-gap: 0.5rem;
    font-size: 1rem;
    max-width: 200px;
  }
  .clear-btn {
    background: var(--clr-red-dark);
    color: var(--clr-white);
    padding: 0.25rem 0.5rem;
    border-radius: var(--radius);
  }
  @media (min-width: 768px) {
    .content {
      position: sticky;
      top: 1rem;
    }
  }
`;

export default Filters;
