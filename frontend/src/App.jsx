import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Search from './Component/Search';
import SplitScreen from './Content/UserProfile/Split';
import ExportAll from './Charts/ExportAll';
import { Toaster } from 'react-hot-toast';
import Compare from './Component/Compare';
import AiStudy from './Component/ai_study';
import Home from './Component/Home';

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/compare" element={<Compare />} />
          <Route path="/single-user" element={<SingleUser />} />
          <Route path="/ai-study" element={<AiStudy />} />
        </Routes>
      </BrowserRouter>
      <Toaster />
    </div>
  );
}
function SingleUser() {
  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #f3e5f5, #e0e0e0)",
        paddingBottom: "2rem",
      }}
    >
      <Search />
      <SplitScreen />
      <ExportAll />
    </div>
  );
}

export default App;
