// core
import React, {FC} from 'react';
import {Route, Routes} from 'react-router-dom';

// components
import {LoginPage} from './components/pages/LoginPage/LoginPage';
import {MainPage} from './components/pages/MainPage/MainPage';
import {OneList} from './components/Main/TodoList/OneList/OneList';

// vkui
import {
    AdaptivityProvider,
    ConfigProvider,
    AppRoot,
    SplitLayout,
    SplitCol,
    View,
    Panel,
    PanelHeader,
    Header,
    Group,
    SimpleCell,
} from '@vkontakte/vkui';
import '@vkontakte/vkui/dist/vkui.css';

export const App: FC = () => {
    return (
        <AppRoot>
            <SplitLayout header={<PanelHeader separator={false}/>}>
                <SplitCol autoSpaced>
                    <View activePanel="main">
                        <Panel id="main">
                            <PanelHeader>TODO LIST</PanelHeader>
                            <Group header={<Header mode="secondary">Items</Header>}>
                                <Routes>
                                    <Route path="/login" element={<LoginPage/>}/>
                                    <Route path="/" element={<MainPage/>}/>
                                    <Route path="/list/:id" element={<OneList/>}/>
                                    <Route path="/*" element={<LoginPage/>}/>
                                </Routes>
                            </Group>
                        </Panel>
                    </View>
                </SplitCol>
            </SplitLayout>
        </AppRoot>
    );
};
