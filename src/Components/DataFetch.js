import React,{useEffect,useState} from 'react'
import axios from 'axios'
import Table from './Table' 
import Charts from './Charts'
import Backdrop from '@material-ui/core/Backdrop'
import  CircularProgress from '@material-ui/core/CircularProgress'
import { IconButton, InputBase, makeStyles, Paper } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import Snackbar from '@material-ui/core/Snackbar'
import Alert from '@material-ui/lab/Alert'

const useStyles = makeStyles((theme) => ({
  root: {
    padding: "2px 4px",
    display: "flex",

    width: 250,
    justifyContent: "center",
  },
  IconButton: {
    padding: 10,
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
  },
}));


const DataFetch = () => {
    const classes = useStyles();
    const API_KEY = "10d3ce23ce2ac254ca9451b783350737";
    const [stock,setStock]=useState([])
    const [high,setHigh]=useState([])
    const [low,setLow]=useState([])
    const [open,setOpen]=useState([])
    const [close,setClose]=useState([])
    const [stockSymbol,setStockSymbol]=useState('')
    const [value,setValue]=useState('')
    const [error,setError]=useState(false)
    const [loading,setLoading]=useState(false)
    const [date,setDate]=useState([])
    
    useEffect(()=>{
    const stock_data=async()=>{
            try{  
              setLoading(true) 
              
             const response = await axios.get(
               `https://kstick-cors-anywhere.herokuapp.com/api.marketstack.com/v1/eod?access_key=${API_KEY}&symbols=${value}&limit=10`
             )
               const data=await response.data.data
               console.log(data)
               
                setStock(data);
                setHigh(data.map((highs)=>highs.adj_high))
                setLow(data.map((lows)=>lows.adj_low))
                setClose(data.map((closes)=>closes.adj_close))
                setOpen(data.map((opens)=>opens.adj_open))
                setDate(data.map((dates)=>dates.date))
                
             }
             catch(error){
              
              setError(true)
             
             }
             
              setLoading(false)      
            }
             stock_data()
        },[value])
           
          console.log(date)
         
          const handleSubmit=(e)=>{
             e.preventDefault()
              setValue(stockSymbol)
           }
          
           const handleClose=(e,reason)=>{
             if(reason==='clickaway'){
               return
             }
            setError(false)
           }
            
    return (
      <React.Fragment>
        
        <div style={{ display: "flex", justifyContent: "center" }}>
          <h1>Stock Information NYSE ($)</h1>
        </div>
        <div style={{ display: "flex", justifyContent: "center" }}>

          <Paper component='form' className={classes.root} >
      <InputBase
      id='filled-basic'
      className={classes.input}
      placeholder='Eg:GOOG,AAPL,MSFT'
      value={stockSymbol}
      onChange={(e)=>setStockSymbol(e.target.value.toUpperCase())}
      autoComplete='off'
      spellCheck='false'
      />
      <IconButton type='submit' className={classes.IconButton} onClick={handleSubmit}>
      <SearchIcon/>
      </IconButton>
      </Paper> 
        </div>

      <Snackbar open={error} autoHideDuration={3000} onClose={handleClose} anchorOrigin={{vertical:'top',horizontal:'right'}}>
          <Alert severity='error' onClose={handleClose}>Enter correct Stock Ticker</Alert>
    </Snackbar>


        <Backdrop open={loading}>
          <CircularProgress color="inherit" />
        </Backdrop>
        {value && <Table stock={stock} />}

        {value && (
          <Charts date={date} low={low} high={high} open={open} close={close} value={value}/>
        )}
      </React.Fragment>
    );
}

export default DataFetch
