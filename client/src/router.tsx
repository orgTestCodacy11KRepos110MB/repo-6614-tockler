import * as React from 'react';
import dynamic from 'dva/dynamic';
import { Router, Route, Switch } from 'react-router-dom';
import NotFound from './routes/404';
import { TrayAppPage } from './routes/TrayAppPage';

import { timelineModel } from './models/timeline';
import { rootModel } from './models/root';
import { trayModel } from './models/tray';
import { summaryModel } from './models/summary';

import MainAppPage from './routes/MainAppPage';
import { RootProvider } from './RootContext';
import { TimelineProvider } from './TimelineContext';

function RouterConfig({ history, app }: any) {
    const DynamicMainAppPage = (dynamic as any)({
        app: app,
        models: () => [timelineModel, rootModel, summaryModel],
        component: () => MainAppPage,
    });
    const DynamicTrayAppPage = (dynamic as any)({
        app: app,
        models: () => [trayModel],
        component: () => TrayAppPage,
    });

    return (
        <RootProvider>
            <TimelineProvider>
                <Router history={history}>
                    <Switch>
                        <Route path="/" exact={true} component={DynamicMainAppPage} />
                        <Route path="/app" component={DynamicMainAppPage} />
                        <Route path="/trayApp" component={DynamicTrayAppPage} />
                        <Route path="*" component={NotFound} />
                    </Switch>
                </Router>
            </TimelineProvider>
        </RootProvider>
    );
}

// export default hot.router(module)(RouterConfig);
export default RouterConfig;
