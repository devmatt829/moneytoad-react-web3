import * as React from "react";
import PropTypes from "prop-types";
import { useEffect } from 'react'
import {
  AppBar,
  Toolbar,
  Typography,
  useScrollTrigger,
  Button,
  Box,
  IconButton,
  Menu,
  MenuItem,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import useWindowDimensions from "../../hooks/useDimension";
import { NavLink } from "react-router-dom";
import {
  connectWallet
} from '../../utils/interact.js'
import {useCounterStore, useTimeCounterStore} from '../../utils/store' 
import {ConnectButton} from './connectButton.js'
function ElevationScroll(props) {
  const { width } = useWindowDimensions();
  const { children } = props;
  

  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
  });
 
  
  return React.cloneElement(children, {
    elevation: trigger ? 4 : 0,
    style: {
      backgroundColor:  "transparent",
      color: trigger ? "white" : "white",
      transition: trigger ? "0.3s" : "0.5s",
      boxShadow: "none",
      padding: width > 500 ? "0 50px" : "0",
    },
  });
}

ElevationScroll.propTypes = {
  children: PropTypes.element.isRequired,
};

const pages = ["HOME","FAQ", "WHITEPAPER", "AUDIT"];

export function ElevateAppBar(props) {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const { width } = useWindowDimensions();
  const [timeCount, setTimeCount]=useTimeCounterStore();
  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  
  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };
  const [count,setCount] = useCounterStore();
  const connectWalletPressed = async () => {
    let walletStatus;
    
    if (timeCount)
      { walletStatus = await connectWallet(); 
          
        if (!count.status)
          setCount({address:walletStatus.address,launchtime:true,message:walletStatus.message,status:walletStatus.status})
        else{
          setCount({message:'connect wallet',launchtime:true})
        }
      }
  }
  useEffect(()=>{
      async function addWalletListener(){
      if (window.ethereum) {
        window.ethereum.on('accountsChanged', (accounts) => {
          if (accounts.length > 0) {
            setCount({...count,address:accounts[0]})
          } else {
            setCount({address:'',status:false})
          }
        })
      } else {
        setCount({address:'',status:false})
      }
    }
      addWalletListener();
  },[])
  useEffect(()=>{
    
    connectWalletPressed();
  },[timeCount])
  const styles = {
    button: {
      userSelect: "none",
      color: "#e58f0e",
      fontSize: "16px",
      padding: "5px 30px",
      border: "1px solid #e58f0e",
      borderRadius: "20px",
      textAlign: "center",
      fontWeight: "700",
    }
  }
  return (
    <React.Fragment>
      <ElevationScroll {...props}>
        <AppBar>
          <Toolbar sx={{ display: "flex",justifyContent:'space-between',marginTop:'30px' }} mt={3}>
            <Box sx={{ display: "flex" }}>
              
              <Box
                variant="contained"
                style={styles.button}
                sx={{
                  textTransform: "none",
                  padding: { md: "16px 24px", xs: "5px" },
                }}
              >
                <ConnectButton></ConnectButton>
              </Box>
            </Box>
            
         
            <Box px = {{md:2,xs:1}} display="flex">
                <a href="https://bscscan.com/address/0xd2d28013E97161cb58bfD36643cC93a3E137ec37" style={{marginRight:"15px",marginLeft:'15px'}}>
                  <img
                    src="/image/contract.png"
                    alt="boxa staking"
                    width="27px"
                  />
                </a>
                <a href="https://twitter.com/"  style={{marginRight:"15px",marginLeft:'15px'}}>
                  <img
                    src="/image/twitter.png"
                    alt="boxa staking"
                    width="27px"
                  />
                </a>
                <a href="https://t.me/MoneyToadMiner"  style={{marginRight:"15px",marginLeft:'15px'}}>
                  <img
                    src="/image/telegram.png"
                    alt="boxa staking"
                    width="27px"
                  />
                  <img src="/image/american-flag.png" width="15px" height="10px"/>
                </a>
                <a href="https://t.me/MoneyToadMinerCN"  style={{marginRight:"15px",marginLeft:'15px'}}>
                  <img
                    src="/image/telegram.png"
                    alt="boxa staking"
                    width="27px"
                  />
                  <img src="image/kindpng_7716077.png" alt="china_flag" width="15px" height="10px"/>
                </a>
             </Box>
            

          </Toolbar>
        </AppBar>
      </ElevationScroll>
    </React.Fragment>
  );
}
