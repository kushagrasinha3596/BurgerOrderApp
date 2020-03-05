import React from 'react';
import Modal from '../../components/UI/Modal/Modal';

const ErrorHandler = (WrappedComponent, axios) => {
    return class extends React.Component {

        state = {
            error: null
        }

        componentWillMount(){
            this.reqInterceptor = axios.interceptors.request.use(req => {
                this.setState({error: null});
                return req;
            });

            this.resInterceptor = axios.interceptors.response.use(res => res, error => {
                this.setState({error: error});
            });
        }

        componentWillUnmount(){
            this.axios.request.interceptors.eject(this.reqInterceptor);
            this.axios.response.interceptors.eject(this.resInterceptor);
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
                <WrappedComponent {...this.props}></WrappedComponent>
                </React.Fragment>
            );
        }
    }
}

export default ErrorHandler;