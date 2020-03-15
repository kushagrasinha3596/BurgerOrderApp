import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles(theme => ({
    root: {
      textAlign: 'center'
    },
    inline: {
      display: 'inline-block'
    },
    textAlignment:{
      textAlign: 'center'
    }
  }));

const order = (props) => {
    const classes = useStyles();
    const ingredients = [];

    for(let ingredientName in props.ingredients){
      ingredients.push({
        name: ingredientName,
        amount: props.ingredients[ingredientName]
      });
    }

    const ingredient = ingredients.map((ing, index) => {
    return <span 
    style={
      {
        textTransform: 'capitalize',
        display: 'inline-block',
        margin: '2px 8px',
        border: '1px solid burlywood',
        padding: '5px'
      }
    }
    key={index}>{ing.name} [{ing.amount}] </span>
    });

    return (
        <React.Fragment>
          <ListItem alignItems="flex-start" style={{
            backgroundColor: '#CF8F2E',
            borderRadius: '25px',
            width: '65%',
            margin: 'auto',
            marginBottom: '5px'
          }}>
            <ListItemText
            classes={
              {
                secondary : classes.textAlignment,
                root: classes.root
              }
            }
              primary={ingredient}
              secondary={
                <React.Fragment>
                  <Typography
                    component="span"
                    variant="body2"
                    className={classes.inline}
                    color="textPrimary"
                  >
                    Price: <strong>{props.price.toFixed(2)}</strong>
                  </Typography>
                </React.Fragment>
              }
            />
          </ListItem>
        </React.Fragment>
      );
}

export default order;