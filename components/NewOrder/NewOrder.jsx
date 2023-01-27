import React from "react";
import styles from "../../styles/NewOrder.module.css";
import swr from "swr";
import { useRouter } from "next/router";
export default function NewOrder() {
  const router = useRouter();

  const fetcher = (url) => fetch(url).then((res) => res.json());

  const { data: products, error: productsErr } = swr(
    process.env.NEXT_PUBLIC_API + "/api/products",
    fetcher
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    const orderDescription = e.target.orderDescription.value;
    const products = [];
    const checkboxes = document.querySelectorAll('input[type="checkbox"]');
    checkboxes.forEach((checkbox) => {
      if (checkbox.checked) {
        products.push(checkbox.value);
      }
    });
    const order = {
      orderDescription,
      products,
    };
    const response = await fetch(process.env.NEXT_PUBLIC_API + "/api/orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(order),
    });
    if (response.status === 200) {
      router.push("/");
      return;
    }
    alert("Something went wrong");
  };

  return (
    <div className={styles.newOrder}>
      <h1>New Order</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          id="orderDescription"
          name="orderDescription"
          placeholder="Order Description"
        />
        <div className={styles.productList}>
          {products &&
            products.map((product) => (
              <Product
                key={product.id}
                name={product.productName}
                description={product.productDescription}
                id={product.id}
              />
            ))}
        </div>
        <div className={styles.formBottom}>
          <button type="reset">Cancel</button>
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
}

const Product = ({ name, description, id }) => {
  return (
    <div className={styles.productWrapper}>
      <input type={"checkbox"} value={id} />
      <div className={styles.product}>
        <p>{name}</p>
        <p>{description}</p>
      </div>
    </div>
  );
};
