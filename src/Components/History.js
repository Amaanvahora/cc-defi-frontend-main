import React, { useEffect, useState } from 'react'
import "./History.css"

const sampleData = [
    {"token": "ETH", "amount": 500, "timestamp": 12345456},
    {"token": "ETH", "amount": 500, "timestamp": 12345456},
    {"token": "ETH", "amount": 500, "timestamp": 12345456},
]

const History = () => {
    const [userData, setUserData] = useState(sampleData);
    const [data, setData] = useState(sampleData);
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        if(searchTerm.length > 0){
            const filterData = userData.filter((row) => 
            row.token.toLowerCase().includes(searchTerm.toLowerCase()));
            setData(filterData);
        } else {
            setData(userData);
        }
    },[searchTerm]);
 
    const handleSearchTermChange = (event) => { 
        setSearchTerm(event.target.value); 
    }; 

  return (
    <div className='history-main'>
        <div className='histroy-title'>User Add Liquidity History</div>
        <div className='history-search'><input value={searchTerm} onChange={handleSearchTermChange}/></div>
        <div className='histroy-table'>
            <table>
                <tr>
                    <td>Token</td>
                    <td>Amount</td>
                    <td>Timestamp</td>
                </tr>
                {
                    data.length > 0 ? data.map((item,i) => (
                        <tr key={i}>
                            <td>{item.token}</td>
                            <td>{item.amount}</td>
                            <td>{item.timestamp}</td>
                        </tr>
                    )) : <tr>
                        
                    </tr>
                }
            </table>
        </div>
    </div>
  )
}

export default History

/**
 * import React, { useState } from "react"; 
import { makeStyles } from "@mui/styles"; 
import { 
  AppBar, 
  Container, 
  Toolbar, 
  Typography, 
  Table, 
  TableContainer, 
  TableHead, 
  TableRow, 
  TableCell, 
  TableBody, 
  Paper, 
  TextField, 
} from "@mui/material"; 
const useStyles = makeStyles(() => ({ 
  container: { 
    marginTop: 16, 
  }, 
  appBar: { 
    marginBottom: 8, 
  }, 
  toolbar: { 
    justifyContent: "space-between", 
  }, 
  filterContainer: { 
    display: "flex", 
    alignItems: "center", 
    marginBottom: 8, 
  }, 
  searchInput: { 
    flexGrow: 1, 
    marginRight: 8, 
  }, 
  tableContainer: { 
    marginBottom: 16, 
  }, 
  table: { 
    minWidth: 650, 
  }, 
  tableHeader: { 
    fontWeight: "bold", 
  }, 
})); 
 
const History = () => { 
  const classes = useStyles(); 
  const [searchTerm, setSearchTerm] = useState(""); 
 
  const tableData = [ 
    { name: "Ether ETH", price: "$2,351.75", change: "-0.66%", tvl: "$1.3B", volume: "$796.5M", volumeTrend: [5, 10, 5, 15, 10] }, 
    { name: "USDCoin USDC", price: "$1.00", change: "0.00%", tvl: "$653.8M", volume: "$423.5M", volumeTrend: [3, 7, 3, 8, 7] }, 
    // ... more tokens 
  ]; 
 
  const filteredData = tableData.filter((row) => 
    row.name.toLowerCase().includes(searchTerm.toLowerCase()) 
  ); 
 
  const handleSearchTermChange = (event) => { 
    setSearchTerm(event.target.value); 
  }; 
 
  return ( 
    <Container maxWidth="xl" className={classes.container}> 
      <AppBar position="static" className={classes.appBar}> 
        <Toolbar className={classes.toolbar}> 
          <Typography variant="h6">Top Tokens on Uniswap</Typography> 
        </Toolbar> 
      </AppBar> 
 
      <div className={classes.filterContainer}> 
        <TextField 
          className={classes.searchInput} 
          label="Search" 
          variant="outlined" 
          value={searchTerm} 
          onChange={handleSearchTermChange} 
        /> 
      </div> 
 
      <TableContainer component={Paper} className={classes.tableContainer}> 
        <Table className={classes.table} aria-label="simple table"> 
          <TableHead> 
            <TableRow> 
              <TableCell className={classes.tableHeader}>Token Name</TableCell> 
              <TableCell className={classes.tableHeader}>Price</TableCell> 
              <TableCell className={classes.tableHeader}>Change</TableCell> 
              <TableCell className={classes.tableHeader}>TVL</TableCell> 
              <TableCell className={classes.tableHeader}>Volume</TableCell> 
            </TableRow> 
          </TableHead> 
          <TableBody> 
            {filteredData.map((row, index) => ( 
              <TableRow key={index}> 
                <TableCell>{row.name}</TableCell> 
                <TableCell>{row.price}</TableCell> 
                <TableCell>{row.change}</TableCell> 
                <TableCell>{row.tvl}</TableCell> 
                <TableCell> 
                  {row.volume} 
                </TableCell> 
              </TableRow> 
            ))} 
          </TableBody> 
        </Table> 
      </TableContainer> 
    </Container> 
  ); 
}; 
 
export default History;
 */