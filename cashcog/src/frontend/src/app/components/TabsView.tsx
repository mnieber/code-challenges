import React from 'react';
import { observer } from 'mobx-react-lite';

import { Tabs } from 'antd';
import { ExpensesInbox } from 'src/inbox/components/ExpensesInbox';
import { ExpensesOverview } from 'src/expenses/components/ExpensesOverview';
import { ConfirmationView } from 'src/inbox/components/ConfirmationView';

const { TabPane } = Tabs;

type PropsT = {};

export const TabsView: React.FC<PropsT> = observer((p: PropsT) => {
  return (
    <Tabs defaultActiveKey="inbox" className="w-full xl:w-4/5">
      <TabPane tab={<h1>Inbox</h1>} key="inbox">
        <ExpensesInbox />
      </TabPane>
      <TabPane tab={<h1>All</h1>} key="all">
        <ExpensesOverview />
      </TabPane>
      <TabPane tab={<h1>Confirm</h1>} key="confirm">
        <ConfirmationView />
      </TabPane>
    </Tabs>
  );
});
