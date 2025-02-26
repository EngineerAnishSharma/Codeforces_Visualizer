import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './Component/Navbar';
import Search from './Component/Search';
import SplitScreen from './Content/UserProfile/Split';
import ExportAll from './Charts/ExportAll';
import { Toaster } from 'react-hot-toast';
import Compare from './Component/Compare';

function App() {
  return (
    <div>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route exact path="/compare" element={<Compare />} />
          <Route path="/" element={<SingleUser />} />
        </Routes>
      </BrowserRouter>
      <Toaster />
    </div>
  );
}

function SingleUser() {
  return (
    <>
      <Search />
      <SplitScreen />
      <ExportAll />
    </>
  );
}

export default App;
