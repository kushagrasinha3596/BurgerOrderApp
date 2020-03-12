import React from 'react';
import Order from '../../components/Order/Order';
import List from '@material-ui/core/List';
import { withStyles } from '@material-ui/core/styles';

const styles = (theme) => ({
    root: {
      width: '100%',
      maxWidth: 360,
      backgroundColor: theme.palette.background.paper,
    }
  });

class Orders extends React.Component{
    render() {
        let {classes} = this.props;
        return (
            <List className={classes.root}>
                <Order></Order>
                <Order></Order>
            </List>
        );
    }
}

export default withStyles(styles)(Orders);