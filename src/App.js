import { useEffect, useState } from 'react';
import './App.css';
import Swap from './Components/Swap';
import History from './Components/History';
import { BrowserRouter as Router, Routes, Route, Link, useMatch } from 'react-router-dom';
import Web3 from "web3";
import AddLiquidity from './Components/AddLiquidity';
import BuyBack from './Components/BuyBack';

function App() {
  const [connectedAccount, setConnectedAccount] = useState(null);
  const [accountBalance, setAccountBalance] = useState(0);

  useEffect(() => {
    if (window.ethereum) {
      window.ethereum.on('chainChanged', () => {
        window.location.reload();
      })
      window.ethereum.on('accountsChanged', () => {
        window.location.reload();
      })
    }
  });

  function NavLink({to, children}) {
    let match = useMatch(to);
    return (
      <li>
        <Link to={to} className={match ? 'active-tab' : ''}>
          {children}
        </Link>
      </li>
    );
  }

  const handleConnectWallet = async () => {
    try {
      // Request account access
      await window.ethereum.request({ method: "eth_requestAccounts" });

      // Use Web3.js with the injected provider
      const web3 = new Web3(window.ethereum);

      // Get the connected account
      const accounts = await web3.eth.getAccounts();
      const connectedAddress = accounts[0];
      setConnectedAccount(connectedAddress);

      // Get the account balance
      const balance = await web3.eth.getBalance(connectedAddress);
      const balanceInWei = web3.utils.fromWei(balance, "ether")
      setAccountBalance(Number(balanceInWei).toFixed(2));
    } catch (error) {
      console.error("Error connecting to MetaMask:", error);
    }
  };

  const handleDisconnectWallet = () => {
    setConnectedAccount(null);
    setAccountBalance(null)
  }

  return (
    <div className="App">
      <Router>
        <nav className='navbar-main'>
          <div className='navbar-name'><h1>OpenSwap</h1></div>
          <div className='navbar-navigation-wrapper'>
            <ul className='nav-bar'>
              <NavLink to="/">Swap</NavLink>
              {/* <NavLink to="/History">History</NavLink> */}
              <NavLink to="/Addliquidty">Add Liquidity</NavLink>
              <NavLink to="/buyBack">Buy Back</NavLink>
            </ul>
          </div>
          <div className='navbar-connect'>
            {
              connectedAccount ? <button className='disoconnect-btn' onClick={handleDisconnectWallet}><div className='navbar-userinfo'>
                <div className='address'>{connectedAccount.substring(0,5)+"..."+connectedAccount.substring(connectedAccount.length-5,connectedAccount.length)}</div>
                <div>/</div><div className='balance'>{accountBalance}</div>
              </div></button> : <button className="connect-btn" onClick={handleConnectWallet}>Connect</button>
            }
          </div>
        </nav>
        <Routes>
          <Route path="/" element={<Swap />} />
          {/* <Route path="/History" element={<History />} /> */}
          <Route path="/Addliquidty" element={<AddLiquidity />} />
          <Route path="/buyBack" element={<BuyBack />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
