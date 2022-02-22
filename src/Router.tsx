import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./routes/Home";
import CoinDetail from "./routes/CoinDetail";
import Chart from "./components/Chart";
import Price from "./components/Price";

const Router = () => {
  return (
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/:id" element={<CoinDetail />}>
          <Route path="chart" element={<Chart />} />
          <Route path="price" element={<Price />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
