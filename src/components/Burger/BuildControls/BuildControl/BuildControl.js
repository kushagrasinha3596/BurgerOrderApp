import React from 'react';
import classes from './BuildControl.css';
import Button from '@material-ui/core/Button';

const buildControl = (props) => {
    return (
    <div className={classes.BuildControl}>
        <div className={classes.Label}>{props.label}</div>
       <Button 
       disabled={props.toDisable} 
       onClick={props.deleted} 
       className={classes.Less}>Less</Button> 
       <Button 
       onClick={props.added} 
       className={classes.More}>More</Button> 
    </div>
    )
}

export default buildControl;