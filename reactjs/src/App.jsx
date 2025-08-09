import { useState } from 'react';
import { HashRouter, Route, Routes } from 'react-router-dom';
import { ChakraProvider } from '@chakra-ui/react';

import Navbar from './components/layout/Navbar';
import MotivationalTips from './pages/MotivationalTips';
import CreateTipForm from './pages/CreateTipForm';
import Landing from './pages/Landing';
import AskAI from './pages/AskAI';

function App() {
  const [ethAddress, setETHAddress] = useState('');
  const [userSigner, setUserSigner] = useState(null);

  return (
    <ChakraProvider>
      <HashRouter>
        <Navbar
          ethAddress={ethAddress}
          setETHAddress={setETHAddress}
          setUserSigner={setUserSigner} />
        <Routes>
          <Route
            path="/askai"
            element={
              <AskAI />} />
          <Route
            path="/motivationaltips"
            element={
              <MotivationalTips ethAddress={ethAddress} userSigner={userSigner} />} />
          <Route
            path="/create-tipform"
            element={
              <CreateTipForm userSigner={userSigner} />} />
          <Route
            path="/"
            element={<Landing />} />
        </Routes>
      </HashRouter>
    </ChakraProvider>
  )
}

export default App
