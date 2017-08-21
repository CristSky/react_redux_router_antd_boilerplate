import {Component} from 'react'
import {Layout, Card, Row, Col} from 'antd';
import {push} from 'react-router-redux'
import store from './../../reducers'
import {fetchFakeLogin} from './../../reducers/login'
import LoginForm from './login_form'


class Login extends Component {
    constructor(props) {
        super(props);
    }


    componentDidMount() {
        this.unsubscribe = store.subscribe(() => {
            this.setState(store.getState());
        });
    }


    componentWillUnmount() {
        this.unsubscribe();
    }


    doLogin = form => store
        .dispatch(fetchFakeLogin(form))
        .then(() => {
            setTimeout(() => {
                store.dispatch(push('/'));
            }, 1000);
        });


    render() {
        return (
            <Layout style={{
                backgroundImage: 'url(/assets/login-background.jpg)',
                backgroundSize: '100% 100%',
                backgroundRepeat: 'no-repeat'
            }}>
                <Row style={{height: '100vh'}} type="flex" justify="space-around" align="middle">
                    <Col span={6}>
                        <Card title="React Boilerplate login sample" >
                            <LoginForm doLogin={this.doLogin}/>
                        </Card>
                    </Col>

                </Row>
            </Layout>
        );
    }
}


export default Login;