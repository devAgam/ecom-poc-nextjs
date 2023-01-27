import React from "react";
import styles from "../../styles/OrderTable.module.css";
import swr from "swr";
import Link from "next/link";
export default function OrderTable() {
  const fetcher = (url) => fetch(url).then((res) => res.json());
  const { data: orders, error: ordersErr } = swr(
    process.env.NEXT_PUBLIC_API + "/api/orders",
    fetcher
  );

  return (
    <div className={styles.orderTable}>
      <h1>Order Management</h1>
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
          {orders &&
            orders.map((order) => (
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
