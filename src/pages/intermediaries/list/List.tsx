import React from "react";
import CircularProgress from "@material-ui/core/CircularProgress";
import Button from "@material-ui/core/Button";
import { useHistory } from "react-router-dom";
import { endpoints } from "configs";
import { Card } from "components";
import { useFetch } from "hooks";
import { Intermediary } from "types";
import styles from "./List.module.css";

const List: React.FC = () => {
  const history = useHistory();

  const [intermediaries = [], loading, getIntermediaries] = useFetch<
    Intermediary[]
  >({
    url: endpoints.getIntermediaries,
    prepareResponse: (intermediaries) =>
      intermediaries.sort((first, second) => first.order - second.order),
  });

  const handleRemove = (id: number) => {
    fetch(endpoints.removeIntermediary(id), {
      method: "delete",
    })
      .then(() => getIntermediaries())
      .catch((error) => console.warn(error));
  };

  const handleEdit = (id: number) => {
    history.push(`/intermediaries/details/${id}`);
  };

  const handleAdd = () => {
    history.push("/intermediaries/details/new");
  };

  return (
    <div>
      <h1>Intermediaries</h1>
      <Button size="small" color="primary" onClick={handleAdd}>
        Add
      </Button>
      {loading ? (
        <CircularProgress />
      ) : intermediaries.length > 0 ? (
        <ul className={styles.list}>
          {intermediaries.map((intermediary) => (
            <li key={intermediary.id} className={styles.listItem}>
              <Card
                title={intermediary.name}
                label={`Order - ${intermediary.order}`}
                description={new Date(intermediary.createdAt).toLocaleString()}
                onRemove={() => handleRemove(intermediary.id)}
                onEdit={() => handleEdit(intermediary.id)}
              />
            </li>
          ))}
        </ul>
      ) : (
        <h2>
          No intermediaries yet. To create one please use Add button above!
        </h2>
      )}
    </div>
  );
};

export default List;
