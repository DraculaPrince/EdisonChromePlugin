import About from '@/container/About';
import Dashboard from '@/container/Dashboard';
import Layout from "@/layout";
import { observer } from 'mobx-react';
import {
  // HashRouter as Router,
  Navigate, Route,
  Routes
} from "react-router-dom";
import { useStores } from './hooks/use-stores';
import './assets/styles/Base.css';

const App = () => {
  const { commonStore, userStore } = useStores();
  return (
    <>
      {/* <Router> */}
        <Layout>
          <Routes>
            <Route
              path="/"
              element={<Navigate to="/dashboard" replace />}
            ></Route>
            <Route path="/dashboard" element={<Dashboard></Dashboard>} />
            <Route path="/about" element={<About></About>} />
          </Routes>
        </Layout>
      {/* </Router> */}
    </>
  );
};

export default observer(App);