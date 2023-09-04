import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Header, Icon, Segment, Tab } from "semantic-ui-react";
import { API_BASE_URL } from "../../config/config.utils";
import { Link, NavLink, useNavigate } from "react-router-dom";

export const ReportIndex = ()=>{
    const [metaurl, setMetaUrl] = useState('https://api.staging.kifiya.et/auth/login');

    const [url, setUrl] = useState('');
  
    const [curruntUrl, setCurruntUrl] = useState('');
  
    const [report, setReport] = useState([]);
  
    const [refresh, setRefresh] = useState(false);
  
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate()

    const  handleClick =(e,data)=>{
        console.log(data)
          setUrl(data[1]?.iframeUrl);
          setCurruntUrl(data[0]);
       }

       const handleAdvanced =()=>{
            navigate(metaurl)
       }

      useEffect(() => {
        axios
          .get(API_BASE_URL + "dashboard", {
            headers: {
              "content-type": "application/json",
              'X-API-Key': 'PqtD29VCio9XSkoliGPRtvdFkiEkeJWG'
            //   ,
            //   'Authorization': `Bearer ${TokenManager.getToken()}`
            },
          })
          .then((res) => {
    
            setLoading(false);
            setUrl(res.data.Dashboard.MainDashboard.iframeUrl);
    
            if (!Object.keys(res.data.Dashboard).length == 0) {
              const response = Object.entries(res.data.Dashboard);
              setReport(response);
              setCurruntUrl(response[0][0]);
            }
          })
          .catch((error) => {
            setLoading(false);
          });
    
      }, [refresh]);

      const handleRefresh = () => {
        setLoading(true);
        setRefresh(!refresh);
      };
      
    
   const report1 =["test"]
      const panes = report1.map((tab) => ({
        menuItem: (
            <div>
              
              {tab[0]}
            </div>
          ),
        render: () => <Tab.Pane>    <iframe
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%"
        }}
        src={url}
        frameBorder="0"
      /></Tab.Pane>,
      }));

    return(
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
       <Segment loading={loading} id="report" >
             <Header as='h5' floated='right'>
             <Link
              noWrap
              key={metaurl}
              as={NavLink}
              to={metaurl}
              variant="body2"
              target="_blank"
              rel="noopener"
              sx={{ display: 'table' }}
            >
              Advanced Insight
            </Link>
            &nbsp; &nbsp; &nbsp; 
    <Icon.Group size='large'>
    <Icon onClick={handleRefresh} name="refresh"/>
    </Icon.Group>
  
  </Header>
           
 <Tab panes={panes}  onTabChange={handleClick} />
        </Segment>
    </div>
       
       
    )

}