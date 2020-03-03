import React from 'react';
import Modal from '../../components/UI/Modal/Modal';

const ErrorHandler = (WrappedComponent, axios) => {
    return class extends React.Component {

        state = {
            error: null
        }

        componentDidMount(){
            axios.interceptors.request.use(req => {
                this.setState({error: null});
                return req;
            });

            axios.interceptors.response.use(res => res, error => {
                this.setState({error: error});
            });
        }

        errorHandler = () => {
            this.setState({error: null});
        }

        render() {
            return (
                <React.Fragment>
                <Modal 
                show={this.state.error}
                modalClosed={this.errorHandler}>
                    {this.state.error ? this.state.error.message: null}
                </Modal>
                <WrappedComponent {...this.state.props}></WrappedComponent>
                </React.Fragment>
            );
        }
    }
}

export default ErrorHandler;