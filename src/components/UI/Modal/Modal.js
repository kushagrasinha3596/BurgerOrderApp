import React from 'react';
import classes from './Modal.css';
import Backdrop from '../Backdrop/Backdrop';

class Modal extends React.Component{

    componentDidUpdate(){
        console.log("ComponentDidUpdate of Modal Component");
    }

    shouldComponentUpdate(nextProps, nextState){
        if(this.props.show !== nextProps.show || this.props.children !== nextProps.children){
            return true;
        }else{
            return false;
        }
    }

    render(){
        return (
            <React.Fragment>
                <Backdrop 
                show={this.props.show}
                clicked={this.props.modalClosed}></Backdrop>
                <div className={classes.Modal}
                    style={{
                        transform: this.props.show ? 'translateY(0)' : 'translateY(-100vh)',
                        opacity: this.props.show ? '1' : '0'
                    }}>
                    {this.props.children}
                </div>
            </React.Fragment>
        )
    }
}

export default Modal;