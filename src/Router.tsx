import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./routes/Home";
import CoinDetail from "./routes/CoinDetail";
import Price from "./components/Price";
import Chart from "./components/Chart";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/:id" element={<CoinDetail />}>
          <Route path="price" element={<Price />} />
          <Route path="chart" element={<Chart />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
