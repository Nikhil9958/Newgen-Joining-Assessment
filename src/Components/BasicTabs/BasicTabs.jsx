import * as React from 'react';
import { useState } from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import AddIcon from '@mui/icons-material/Add';
import { Button, Grid, InputLabel } from '@mui/material';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import CheckBox from '../Checkbox/Checkbox'
import { v4 as uuidv4 } from 'uuid';


import './BasicTabs.css'
import Card from '../Card/Card';

import CssBaseline from '@mui/material/CssBaseline';
import BasicTable from '../BasicTable/BasicTable';


// import Main from '../Main/Main'

const defaultFixedBoxValue = {
  versionKey: 'V1',
  versionValue: 'V1',
  isDeletable: false,

  timeStampKey: 'T1',
  timeStampValue: '23/08/2022 1:54pm',

  algorithmKey: 'RFC',
  algorithmValue: 'RFC',

  clusterKey: 'C1',
  clusterValue: 'Cluster Index - 1'
}

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default function BasicTabs() {
  const [value, setValue] = React.useState(0);
  
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const [dataArray, setDataArray] = useState([]);
  const [version, setVersion] = useState('V1');
  const [date, setDate] = useState('');
  const [algorithm, setAlgorithm] = useState('');
  const [cluster, setCluster] = useState('');
  const [tableCardData, setTableCardData] = useState([]);

  console.log(version, date, algorithm, cluster);

  const handleClickAdd = () => {
    var id = uuidv4();
    setDataArray([...dataArray, {
      id: id,
      // 'version': version,
      // 'timeStamp': date,
      // 'algorithm': algorithm,
      // 'cluster': cluster,
      versionKey: 'V1',
      versionValue: 'V1',
      isDeletable: false,

      timeStampKey: 'T1',
      timeStampValue: '23/08/2022 1:54pm',
      isDeletable: true,

      // algorithmKey: 'RFC',
      // algorithmValue: 'RFC',

      // clusterKey: 'C1',
      // clusterValue: 'Cluster Index - 1'
    }])
    const tableData = {
      id:id,
      Precesion:'0.34324',
      Timestamp:'Oct 20,2020 ; 02:23 pm',
      Scheduling:'Flase',
      AreaUnderROC:'AreaUnderROC',
      View_Type:'A',
      giniCoefficient:'-0.32453',
      AreaUnderPR:'0.77094'
    }
    setTableCardData([...tableCardData,tableData]);
  };

  const handleCardClose = (id) =>{
    console.log("###########");
    console.log(id,tableCardData); 
    const newFiltered = tableCardData.filter((card) => card.id !== id);
    setTableCardData(newFiltered);
    const newFilteredData = dataArray.filter((card) => card.id !== id);
    setDataArray(newFilteredData);
  }
  return (
    // <Box className='basictabs'>
    <>
      <Box sx={{ padding: '0px', borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example" style={{ display: 'inline-block' }}>
          <Tab label="Best Model" {...a11yProps(0)} />
          <Tab label="Comparision" {...a11yProps(1)} />
          <Tab label="All Models" {...a11yProps(2)} />
        </Tabs>

        <button className='downloadBtn'>Download <select name="types" id="downloadBtnId"></select> </button>
        <p className='viewPipeline'>View Pipeline</p>

      </Box>
      <TabPanel value={value} index={0}>
        Best Model
      </TabPanel>
      <TabPanel value={value} index={1} className='card-container'>
        <div style={{ display: 'flex' }}>
          <div className='addAlgorithm'>
            <div className='addAlgorithmSubContainer'>
              <Button variant="contained" className='addButton' onClick={handleClickAdd}><AddIcon fontSize='large' /></Button>
              <p className='addAlgoText'>Add Algorithm</p>
            </div>
          </div>
          <div className='cards-subcontainer' sx={{ '&:first-child ': { padding: '1.5em' } }}>
            <Card data={defaultFixedBoxValue} className='fixed-card-container' />
            <div style={{ width: '100%', display: 'flex' }}>
              {
                dataArray.map(curr => (
                  <Card
                    key={curr.id}
                    name={curr.id}
                    data={curr}
                    allCards={dataArray}
                    removeCard={handleCardClose}
                    
                  />
                ))
              }
            </div>
          </div>
        </div>
        <CheckBox />
        <div className='matrices'>
              Matrices
        </div>
        <BasicTable data={tableCardData} />
      </TabPanel>
      <TabPanel value={value} index={2}>
        All Models
      </TabPanel>
    </>

    // </Box>
  );
}


