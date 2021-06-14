import React from "react";
import CircularProgress from "@material-ui/core/CircularProgress";
import Button from "@material-ui/core/Button";
import { endpoints } from "configs";
import { Card } from "components";
import { useFetch } from "hooks";
import { Product } from "types";
import styles from "./List.module.css";

const List: React.FC = () => {
  const [products = [], loading, getProducts] = useFetch<Product[]>({
    url: endpoints.getProducts,
    prepareResponse: (products) =>
      products.sort((first, second) => first.name.localeCompare(second.name)),
  });

  const handleRemove = (id: number) => {
    fetch(endpoints.removeProduct(id), { method: "delete" })
      .then(() => getProducts())
      .catch((error) => console.warn(error));
  };

  return (
    <div>
      <h1>Products</h1>
      <Button size="small" color="primary">
        Add
      </Button>
      {loading ? (
        <CircularProgress />
      ) : products.length > 0 ? (
        <ul className={styles.list}>
          {products.map((product) => (
            <li key={product.id} className={styles.listItem}>
              <Card
                title={product.name}
                description={`Price - ${product.price}`}
                onRemove={() => handleRemove(product.id)}
              />
            </li>
          ))}
        </ul>
      ) : (
        <h2>No products yet. To create one please use Add button above!</h2>
      )}
    </div>
  );
};

export default List;
