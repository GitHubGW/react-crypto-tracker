import { HashRouter, Routes, Route } from "react-router-dom";
import Home from "./routes/Home";
import CoinDetail from "./routes/CoinDetail";
import Chart from "./components/Chart";
import Price from "./components/Price";

const Router = () => {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/:id" element={<CoinDetail />}>
          <Route path="chart" element={<Chart />} />
          <Route path="price" element={<Price />} />
        </Route>
      </Routes>
    </HashRouter>
  );
};

export default Router;
