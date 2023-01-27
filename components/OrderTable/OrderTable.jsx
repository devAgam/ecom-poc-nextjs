import React, { useEffect, useState } from "react";
import styles from "../../styles/OrderTable.module.css";
import Link from "next/link";
export default function OrderTable() {
  // FETCHING ORDERS

  useEffect(() => {
    // I used useEffect here to easily asign the data to the state
    fetch(process.env.NEXT_PUBLIC_API + "/api/orders")
      .then((res) => res.json())
      .then((data) => setOrderState(data));
  }, []);

  // i used state here to implement the search functionality

  const [orderState, setOrderState] = useState(null);

  const handleSearch = (e) => {
    const searchValue = e.target.value;
    if (searchValue) {
      // serach the state for the value in order description or id
      const filteredOrders = orderState.filter((order) => {
        if (
          order.orderDescription.includes(searchValue) ||
          order.id == searchValue
        ) {
          return order;
        }
      });
      setOrderState(filteredOrders);
    } else {
      // if the search value is empty, fetch the orders again
      fetch(process.env.NEXT_PUBLIC_API + "/api/orders")
        .then((res) => res.json())
        .then((data) => setOrderState(data));
    }
  };

  return (
    <div className={styles.orderTable}>
      <div className={styles.orderTableHead}>
        <h1>Order Management</h1>
        <input
          type="search"
          placeholder="Search by order description or id"
          onChange={handleSearch}
        />
      </div>
      <table>
        <thead>
          <tr>
            <th>Order Id</th>
            <th>Order Description</th>
            <th>Count of Products</th>
            <th>Created Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {orderState &&
            orderState.map((order) => (
              <tr key={order.id}>
                <td>{order.id}</td>
                <td>{order.orderDescription}</td>
                <td>{order.orderProductMap.length}</td>
                <td>{convertIsoToYYYYMMDD(order.createdAt)}</td>
                <td>
                  <button className={styles.btn}>Edit</button>
                  <button className={styles.btn}>Delete</button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
      <Link href={"/new-order"} className={styles.redirectToOrder}>
        New Order
      </Link>
    </div>
  );
}

function convertIsoToYYYYMMDD(isoDate) {
  const date = new Date(isoDate);
  return date.toISOString().split("T")[0];
}
