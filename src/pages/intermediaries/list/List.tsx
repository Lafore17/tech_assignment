import React from "react";
import Button from "@material-ui/core/Button";
import { useHistory } from "react-router-dom";
import { endpoints } from "configs";
import { Card } from "components";
import { Intermediary } from "types";
import styles from "./List.module.css";

const List: React.FC = () => {
  const history = useHistory();

  const [intermediaries, setIntermediaries] = React.useState<Intermediary[]>(
    []
  );

  const fetchIntermediaries = () => {
    const sortIntermediariesByOrder = (data: Intermediary[]) => {
      return data.sort((first, second) => first.order - second.order);
    };

    fetch(endpoints.getIntermediaries)
      .then((response) => response.json())
      .then((data: Intermediary[]) =>
        setIntermediaries(sortIntermediariesByOrder(data))
      )
      .catch((error) => console.warn(error));
  };

  const handleRemove = (id: number) => {
    fetch(endpoints.removeIntermediary(id), {
      method: "delete",
    })
      .then(() => fetchIntermediaries())
      .catch((error) => console.warn(error));
  };

  const handleEdit = (id: number) => {
    history.push(`/intermediaries/details/${id}`);
  };

  const handleAdd = () => {
    history.push("/intermediaries/details/new");
  };

  React.useEffect(() => {
    fetchIntermediaries();
  }, []);

  return (
    <div>
      <h1>Intermediaries</h1>
      <Button size="small" color="primary" onClick={handleAdd}>
        Add
      </Button>
      {intermediaries.length > 0 && (
        <ul className={styles.list}>
          {intermediaries.map((intermediary) => (
            <li key={intermediary.id}>
              <Card
                title={intermediary.name}
                label={`Order - ${intermediary.order}`}
                description={new Date(intermediary.createdAt).toLocaleString()}
                className={styles.listItem}
                onRemove={() => handleRemove(intermediary.id)}
                onEdit={() => handleEdit(intermediary.id)}
              />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default List;
