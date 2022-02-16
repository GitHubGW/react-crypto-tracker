import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./routes/Home";
import CoinDetail from "./routes/CoinDetail";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/:id" element={<CoinDetail />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
