import {render} from 'react-dom'
import {Provider} from 'react-redux'
import {Route, Switch} from 'react-router'
import {history} from './utils/history'
import {ConnectedRouter} from 'react-router-redux'
import store from './reducers'
import {LocaleProvider,Calendar} from 'antd';
import en_US from 'antd/lib/locale-provider/en_US';
import style from './styles.css'
import {} from './utils'

import Login from './components/login/login'
import BaseLayout from './components/layout/default_layout'
import {Home} from './components/home/default_home'
import {Content1} from './components/contents/some_content_1'
import {SampleTable} from './components/contents/my_amazing_content'


document.addEventListener('DOMContentLoaded', evt => {
    render(
        <Provider store={store}>
            <LocaleProvider locale={en_US}>
                <ConnectedRouter history={history}>

                    <Switch>
                        <Route exact path="/login" component={Login}/>

                        <Route path="/">
                            <BaseLayout>
                                <div>
                                    <Route exact path="/" component={Home}/>
                                    <Route exact path="/calendar" component={Calendar}/>
                                    <Route exact path="/content1" component={Content1}/>
                                    <Route exact path="/sample_table" component={SampleTable}/>
                                </div>
                            </BaseLayout>
                        </Route>
                    </Switch>

                </ConnectedRouter>
            </LocaleProvider>
        </Provider>,
        document.querySelector('#root')
    );
});
