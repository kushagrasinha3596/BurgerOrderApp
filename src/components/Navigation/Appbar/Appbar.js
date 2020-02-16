import React from 'react';
import { makeStyles, createMuiTheme, ThemeProvider  } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';


const useStyles = makeStyles(theme => ({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
    },
    zInd: {
      zIndex: '90'
    }
  }));

const customTheme = createMuiTheme({
  overrides: {
    MuiAppBar: {
      colorPrimary : {
        backgroundColor: '#703B09'
      }
    }
  }
});

const appBar = (props) => {
    const muiClasses = useStyles();
    return (
      <header>
        <div className={muiClasses.root}>
          <ThemeProvider theme={customTheme}>
          <AppBar position="fixed" 
          classes={
            {root: muiClasses.zInd}
          }>
            <Toolbar>
              <IconButton edge="start" className={muiClasses.menuButton} color="inherit" aria-label="menu">
                <MenuIcon />
              </IconButton>
              <Typography variant="h6" className={muiClasses.title}>
                News
              </Typography>
              <Button color="inherit">Login</Button>
            </Toolbar>
          </AppBar>
          </ThemeProvider>
        </div>
      </header>
      );
}

export default appBar;