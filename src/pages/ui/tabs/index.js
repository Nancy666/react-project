import React, { Component } from 'react';
import { Card, Tabs, Icon ,message} from 'antd'
// import './index.less';
const TabPane = Tabs.TabPane;
export default class Tab extends Component {
    constructor(props) {
        super(props);
        this.newTabIndex = 0;
        const panes = [
            { title: 'Tab 1', content: 'Content of Tab 1', key: '1' },
            { title: 'Tab 2', content: 'Content of Tab 2', key: '2' },
            { title: 'Tab 3', content: 'Content of Tab 3', key: '3', closable: false },
        ];
        this.state = {
            activeKey: panes[0].key,
            panes,
        };

    }
    onEdit = (targetKey, action) => {
        this[action](targetKey);
    }
    add = () => {
        const panes = this.state.panes;
        const activeKey = `newTab${this.newTabIndex++}`;
        panes.push({ title: `New Tab ${this.newTabIndex}`, content: `Content of new Tab ${this.newTabIndex}`, key: activeKey });
        this.setState({ panes, activeKey });
    }

    remove = (targetKey) => {
        let activeKey = this.state.activeKey;
        let lastIndex;
        this.state.panes.forEach((pane, i) => {
            if (pane.key === targetKey) {
                lastIndex = i - 1;
            }
        });
        const panes = this.state.panes.filter(pane => pane.key !== targetKey);
        if (lastIndex >= 0 && activeKey === targetKey) {
            activeKey = panes[lastIndex].key;
        }
        this.setState({ panes, activeKey });
    }
    onChange = (activeKey) => {
        this.setState({
            activeKey
        })
    }
    callback = (key) => {
        message.info("您选择了" + key)
    }
    render() {
        return (
            <div className="tabsWrap">
                <Card title="Tab页签">
                    <Tabs onChange={this.callback} defaultActiveKey="1">
                        <TabPane tab={<span><Icon type="apple" />选项1</span>} key="1" >Content of Tab Pane 1</TabPane>
                        <TabPane tab={<span><Icon type="like" />选项2</span>} key="2" disabled>Content of Tab Pane 2</TabPane>
                        <TabPane tab="选项3" key="3">Content of Tab Pane 3</TabPane>
                    </Tabs>
                </Card>
                <Card title="Tab页签">
                    <Tabs
                        onChange={this.onChange}
                        type="editable-card"
                        activeKey={this.state.activeKey}
                        onEdit={this.onEdit}
                    >
                        {
                            this.state.panes.map((pane) =>
                                <TabPane
                                    tab={pane.title}
                                    key={pane.key}
                                >
                                    {pane.content}
                                </TabPane>)
                        }
                    </Tabs>
                </Card>
            </div>
        )
    }
}