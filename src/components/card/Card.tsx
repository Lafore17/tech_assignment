import React from "react";
import MaterialCard from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

interface CardProps {
  title: string;
  label: string;
  className?: string;
  description?: string;
  editable?: boolean;
  removable?: boolean;
  onEdit?: () => void;
  onRemove?: () => void;
}

const Card: React.FC<CardProps> = ({
  title,
  label,
  description,
  className,
  editable = true,
  removable = true,
  onEdit = () => {},
  onRemove = () => {},
}) => (
  <MaterialCard className={className}>
    <CardActionArea>
      <CardMedia
        image="/static/images/cards/contemplative-reptile.jpg"
        title="Contemplative Reptile"
      />
      <CardContent>
        <Typography gutterBottom component="span">
          {label}
        </Typography>
        <Typography gutterBottom variant="h5" component="h2">
          {title}
        </Typography>
        {description && (
          <Typography variant="body2" color="textSecondary" component="p">
            {description}
          </Typography>
        )}
      </CardContent>
    </CardActionArea>
    {(editable || removable) && (
      <CardActions>
        {editable && (
          <Button size="small" color="primary" onClick={onEdit}>
            Edit
          </Button>
        )}
        {removable && (
          <Button size="small" color="primary" onClick={onRemove}>
            Delete
          </Button>
        )}
      </CardActions>
    )}
  </MaterialCard>
);

export default Card;
