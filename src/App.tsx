// core
import React, {FC} from 'react';
import {Route, Routes} from 'react-router-dom';

// components
import {LoginPage} from './components/pages/LoginPage/LoginPage';
import {MainPage} from './components/pages/MainPage/MainPage';
import {TodoListPage} from './components/pages/TodoListPage/TodoListPage';

// vkui
import {
    SplitLayout,
    SplitCol,
    View,
    Panel,
    PanelHeader,
} from '@vkontakte/vkui';

export const App: FC = () => {
    return (
        <SplitLayout header={<PanelHeader separator={false}/>}>
            <SplitCol autoSpaced>
                <View activePanel="main">
                    <Panel id="main">
                        <PanelHeader>TODO_LIST</PanelHeader>
                        <Routes>
                            <Route path="/login" element={<LoginPage/>}/>
                            <Route path="/" element={<MainPage/>}/>
                            <Route path="/todolist/:id" element={<TodoListPage/>}/>
                            <Route path="/*" element={<MainPage/>}/>
                        </Routes>
                    </Panel>
                </View>
            </SplitCol>
        </SplitLayout>
    );
};
