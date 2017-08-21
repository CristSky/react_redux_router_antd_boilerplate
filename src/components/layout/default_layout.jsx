import {Component, cloneElement} from 'react'
import {Layout, Menu, Icon, Row, Col, message} from 'antd'
import {Link} from 'react-router-dom'
import {push} from 'react-router-redux'
import store from './../../reducers'
import './base.css'

const {Header, Sider, Content} = Layout;


class BaseLayout extends Component {
    constructor(props) {
        super(props);
        this.state = {
            collapsed: true
        };
    }


    componentWillMount() {
        this.setState(store.getState());
    }


    componentDidMount() {
        this.unsubscribe = store.subscribe(() => {
            this.setState(store.getState());
        });

        const {login = {}} = this.state;
        login.username ?
            message.success(`Welcome ${login.username}`) :
            store.dispatch(push('/login'));
    }


    componentWillUnmount() {
        this.unsubscribe();
    }


    toggle = () => this.setState({collapsed: !this.state.collapsed});


    closeSide = () => this.setState({collapsed: true});


    onClickMenu = (item, key) => this.closeSide();


    onClickUserMenu = item => {
        switch (item.key) {
            case 'logout':
                this.setState({login: {}}, () => {
                    store.dispatch(push('/login'));
                });
                break;
        }
    };


    render() {
        const {login = {}} = this.state;

        return (
            <Layout style={{"height": "100%"}}>
                <Header style={{padding: 0, position: 'fixed', width: '100%', zIndex: 9999}}>

                    <Row type="flex" justify="space-between">

                        <Col span={20}>
                            <Row type="flex" justify="start">
                                <Col>
                                    <Menu onClick={this.toggle} theme="dark" mode="horizontal" selectedKeys={[]}
                                          style={{lineHeight: '64px'}}>
                                        <Menu.Item key="1">
                                            <Icon type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}/>
                                        </Menu.Item>
                                    </Menu>
                                </Col>

                                <Col>
                                    <a href="/">
                                        <div className="nav-brand">Brand</div>
                                    </a>
                                </Col>

                                <Col>
                                    <Menu theme="dark" mode="horizontal" defaultSelectedKeys={[]}
                                          style={{lineHeight: '64px'}}>
                                        <Menu.Item key="1">nav 1</Menu.Item>
                                        <Menu.Item key="2">nav 2</Menu.Item>
                                        <Menu.Item key="3">nav 3</Menu.Item>
                                    </Menu>
                                </Col>


                            </Row>
                        </Col>

                        <Col span={4}>
                            <Row type="flex" justify="end">
                                <Col>
                                    <Menu theme="dark" mode="horizontal" style={{lineHeight: '64px'}}
                                          selectedKeys={[]} onClick={this.onClickUserMenu}>
                                        <Menu.SubMenu className="sub-menu--popup-fix" key="sub1"
                                                      title={<span>
                                                              <Icon type="user"/> {login.username}
                                                                  </span>}>

                                            <Menu.Item key="profile" disabled={true}><Icon type="line-chart"/>
                                                Profile</Menu.Item>
                                            <Menu.Item key="logout"><Icon type="logout"/> Logout</Menu.Item>
                                        </Menu.SubMenu>
                                    </Menu>
                                </Col>
                            </Row>
                        </Col>

                    </Row>
                </Header>

                <Layout>
                    <Sider style={{top: 64, overflow: 'auto', position: 'fixed', height: '100%', zIndex: 9999}}
                           trigger={null}
                           collapsible collapsed={this.state.collapsed} collapsedWidth="0">

                        <Menu theme="dark" mode="inline" onClick={this.onClickMenu}>
                            <Menu.Item key="1">
                                <Icon type="calendar"/>
                                <span>Calendar</span>
                                <Link to="/calendar"/>
                            </Menu.Item>

                            <Menu.Item key="2">
                                <Icon type="bar-chart"/>
                                <span>Sample Table</span>
                                <Link to="/sample_table"/>
                            </Menu.Item>

                            <Menu.Item key="3">
                                <Icon type="solution"/>
                                <span>Some Content</span>
                                <Link to="/content1"/>
                            </Menu.Item>
                        </Menu>
                    </Sider>

                    <Layout>
                        <Content style={{
                            margin: '64px 0px 0px 0px',
                            padding: 10,
                            // background: '#fff',
                            overflow: 'initial'
                        }} onClick={this.closeSide}>

                            {cloneElement(this.props.children, {...this.props})}

                        </Content>
                    </Layout>
                </Layout>
            </Layout>
        );
    }
}


export default BaseLayout;