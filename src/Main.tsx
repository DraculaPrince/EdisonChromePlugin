import { ConfigProvider } from 'antd';
import locale from 'antd/es/locale/zh_CN';
import { useLocalStore } from 'mobx-react';
import 'moment/locale/zh-cn';
import React from 'react';
import { HashRouter as Router } from 'react-router-dom';
import App from './container/App';
import { publicStores } from './hooks/use-stores';
import storesContext from './stores';


const Main: React.FC = () => {
  const usedStore = useLocalStore(() => publicStores());
  return(
    <storesContext.Provider value={usedStore}>
      <Router>
        <ConfigProvider locale={locale}>
          <App />
        </ConfigProvider>
      </Router> 
    </storesContext.Provider>
  )
}

export default Main;
