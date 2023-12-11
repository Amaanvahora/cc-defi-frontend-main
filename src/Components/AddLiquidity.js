import React, { useEffect, useState } from 'react'
import "./AddLiquidity.css"

const tokenSample = [
    { token: "0xbkbkjbjkjk", tokenName: "ETH", tokenBalance: 10 ** 18 },
    { token: "0xbkbkjbdfsdjkjk", tokenName: "ETH", tokenBalance: 10 ** 18 },
    { token: "0xbkbkjbjfsdffkjk", tokenName: "ETH", tokenBalance: 10 ** 18 },
]

const sampleData = [
    { "token": "ETH", "amount": 500, "timestamp": 12345456 },
    { "token": "ETH", "amount": 500, "timestamp": 12345456 },
    { "token": "ETH", "amount": 500, "timestamp": 12345456 },
]

const AddLiquidity = () => {
    const [tokenInfo, setTokenInfo] = useState(tokenSample);
    const [userHistory, setUserHistory] = useState(sampleData);
    const [filterData, setFilterData] = useState(sampleData);
    const [searchTerm, setSearchTerm] = useState("");
    const [tokenSelected, setTokenSelected] = useState(tokenInfo[0].token);
    const [supplyAmount, setSupplyAmount] = useState(0);

    useEffect(() => {
        if (searchTerm.length > 0) {
            const filterSearch = userHistory.filter((row) =>
                row.token.toLowerCase().includes(searchTerm.toLowerCase()));
            setFilterData(filterSearch);
        } else {
            setFilterData(userHistory);
        }
    }, [searchTerm]);

    const handleSearchTermChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const handleOnSubmit = (event) => {
        console.log("inside")
        event.preventDefault();
        console.log(tokenSelected)
        console.log(supplyAmount)
    }
    
    const handleOnChangeTokenSelection = (event) => {
        setTokenSelected(event.target.value);
    }


    return (
        <div className='addliquidity-main'>
            <div className='addliquidty-wrapper'>
                <div className='title'>Add Liquidity</div>
                <div className='token-dropdown'>
                    <form onSubmit={handleOnSubmit}>
                        <select value={tokenSelected} onChange={handleOnChangeTokenSelection}>
                            {tokenInfo.length > 0 ?
                                tokenInfo.map((token) => (
                                    <option key={token.token} value={token.token}>{token.tokenName + "" + token.tokenBalance}</option>
                                )) : <div>Connect MetaMask</div>
                            }
                        </select>
                        <input className="input-balance" type='number' value={supplyAmount} onChange={(e) => setSupplyAmount(e.target.value)}/>
                        <button className='submit-btn' type='submit' >Submit</button>
                    </form>
                </div>
            </div>
            <div className='history-main'>
                <div className='histroy-title'>Supply History</div>
                <div className='history-search'><input placeholder="Search" value={searchTerm} onChange={handleSearchTermChange} /></div>
                <div className='histroy-table'>
                    <table>
                        <thead>
                            <tr>
                                <td>Token</td>
                                <td>Amount</td>
                                <td>Timestamp</td>
                            </tr>
                        </thead>
                        <tbody>
                        {
                            filterData.length > 0 ? filterData.map((item, i) => (
                                <tr key={i}>
                                    <td>{item.token}</td>
                                    <td>{item.amount}</td>
                                    <td>{item.timestamp}</td>
                                </tr>
                            )) : <div></div>
                        }
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default AddLiquidity