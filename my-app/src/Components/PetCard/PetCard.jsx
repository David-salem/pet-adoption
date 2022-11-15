import "./PetCard.css";
import { NavLink } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';

export const MultiActionAreaCard = ({ avatar, name, bio, id, AdoptionStatus}) => {
  const route = `/pets/${id}`;

  return (
    <Card sx={{ m: 2 ,width: 200}}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="100"
          image={avatar}
          alt="Pet avatar"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {bio}
          </Typography>
        </CardContent>
        <div className="adoptionStatus-card">
          <Typography variant="body3">
            { AdoptionStatus }
          </Typography>
        </div>
      </CardActionArea>
      <CardActions>
      <div className="link-pet">
        <NavLink to={route}>
          <Button size="small" color="primary">
            See more
          </Button>
        </NavLink>
      </div>
      </CardActions>
    </Card>
  );
}
