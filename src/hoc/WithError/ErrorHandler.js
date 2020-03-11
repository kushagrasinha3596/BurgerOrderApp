import React from 'react';
import Error from '../../components/Error/Error';

const ErrorHandler = (WrappedComponent, axios) => {
    return class extends React.Component {

        state = {
            error: null
        }

        constructor(){
            super();
            this.reqInterceptor = axios.interceptors.request.use(req => {
                this.setState({error: null});
                return req;
            });

            this.resInterceptor = axios.interceptors.response.use(res => res, error => {
                this.setState({error: error});
            });
        }

        // componentWillUnmount(){
        //     this.axios.request.interceptors.eject(this.reqInterceptor);
        //     this.axios.response.interceptors.eject(this.resInterceptor);
        // }

        errorHandler = () => {
            this.setState({error: null});
        }

        render() {
            return (
                <React.Fragment>
                    {
                    this.state.error ? 
                    <Error 
                    errorMessage={this.state.error.message}/> : 
                    <React.Fragment/>
                    }
                <WrappedComponent {...this.props}></WrappedComponent>
                </React.Fragment>
            );
        }
    }
}

export default ErrorHandler;