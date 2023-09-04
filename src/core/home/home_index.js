/* eslint-disable max-classes-per-file */
/* eslint-disable react/no-multi-comp */

import { createMedia } from '@artsy/fresnel'
import PropTypes from 'prop-types'
import React, { Component, useEffect, useState } from 'react'
import { InView } from 'react-intersection-observer'
import { NavLink, useNavigate } from 'react-router-dom'
import logo from "../../images/logo.png"
import {
  Button,
  Container,
  Divider,
  Grid,
  Header,
  Icon,
  Image,
  List,
  Menu,
  Segment,
  Sidebar,
} from 'semantic-ui-react'
import { ConfettiIndex } from '../conffetty/Confetti'
import ConfettiExplosion from 'react-confetti-explosion'

import LottieControl from '../launch/launch_index'
import { AwesomeButton } from 'react-awesome-button';


const { MediaContextProvider, Media } = createMedia({
  breakpoints: {
    mobile: 0,
    tablet: 768,
    computer: 1024,
  },
})

/* Heads up!
 * HomepageHeading uses inline styling, however it's not the best practice. Use CSS or styled
 * components for such things.
 */
const HomepageHeading = ({ mobile }) => {
    const navigate = useNavigate()
    const [launch, setLaunch] = useState(false)
    const [count, setCount] = useState(3)
    const [startCount, setStartCount] = useState(false)

    const handleClick =()=>{
        //  navigate("/confetti")
        // setLaunch(true)
        setStartCount(true)
          const timer = setInterval(() => {
      setCount((prevCount) => prevCount - 1);
    }, 1000);
    return () => {
      clearInterval(timer);
    };
  }
    useEffect(() => {
      if (count === 0) {
        // Countdown finished, perform actions here
        setLaunch(true)
      }
    }, [count]);

    const handleCount = ()=>{
      if(startCount){
      return(
        <>
         <AwesomeButton
  size="small"
  type="primary"
 style={{fontSize:'30%'}}
>
<span role="img" aria-label="tada">
        🚀
              </span>{count}
</AwesomeButton>
         {/* <Button  style={{background:"#ff9c37",color:"white"}} size='huge' >
        <span role="img" aria-label="tada">
        🚀
              </span>{count}
        
        </Button> */}
        <LottieControl/>
        </>
       
      )
      }else{
     return  (
     <>
     <AwesomeButton
  size="large"
  type="primary"
 style={{fontSize:'30%'}}
  onPress={()=>handleClick()}
>
<span role="img" aria-label="tada" >
        🚀
              </span> Launch
</AwesomeButton>
   {/* <AwesomeButton   onPress={()=>handleClick()} style={{color:"white",width:"15%",hignt:"5%",fontSize:"30%"}}><span role="img" aria-label="tada" >
        🚀
              </span> Launch
         </AwesomeButton> */}
      {/* <Button  size='massive' onClick={()=>handleClick()} style={{background:"#ff9c37",color:"white"}}>
        <span role="img" aria-label="tada">
        🚀
              </span> Launch
         
        </Button> */}
        </>)
     
      }
    }
    const getLaunch = ()=>{
      if(launch){
       return <ConfettiIndex/>
      }else{
        return(  
          <div>
          <Header
               style={{
              fontSize: mobile ? '2em' : '5em',
              fontWeight: 'normal',
              marginBottom: 0,
              marginTop: mobile ? '1.5em' : '3em',
              
            }}
         as='h2' icon textAlign='center'>
       
            <Header.Content style={{marginTop:"7%",fontSize:"200%"}}>
            <Image src={logo} size='large' verticalAlign='middle' />{' '}
    <span >2.0</span>
             </Header.Content>
            {handleCount()}
          </Header><br/>
         
        </div>
          
        //   <Container text>
        //   <Header
        //     as='h1'
        //     content='Michu 2.0'
        //     inverted
        //     style={{
        //       fontSize: mobile ? '2em' : '4em',
        //       fontWeight: 'normal',
        //       marginBottom: 0,
        //       marginTop: mobile ? '1.5em' : '3em',
        //     }}
        //   />
       
        //   <Button primary size='huge' onClick={()=>handleClick()}>
        //   <span role="img" aria-label="tada">
        //   🚀
        //         </span> Launch
        //     <Icon name='right arrow' />
        //   </Button>
        // </Container>
        )
      
      }
    }
   
    
 return(

  getLaunch()
 )
 }

HomepageHeading.propTypes = {
  mobile: PropTypes.bool,
}

/* Heads up!
 * Neither Semantic UI nor Semantic UI React offer a responsive navbar, however, it can be implemented easily.
 * It can be more complicated, but you can create really flexible markup.
 */
class DesktopContainer extends Component {
  state = {}

  toggleFixedMenu = (inView) => this.setState({ fixed: !inView })

  render() {
    const { children } = this.props
    const { fixed } = this.state
  

    return (
      <Media greaterThan='mobile'>
        <InView onChange={this.toggleFixedMenu}>
          <Segment
          
            textAlign='center'
            style={{ minHeight: '100vh', padding: '1em 0em' }}
            vertical
          >
      
            <HomepageHeading />
          </Segment>
        </InView>

        {children}
      </Media>
    )
  }
}

DesktopContainer.propTypes = {
  children: PropTypes.node,
}

class MobileContainer extends Component {
  state = {}

  handleSidebarHide = () => this.setState({ sidebarOpened: false })

  handleToggle = () => this.setState({ sidebarOpened: true })

  render() {
    const { children } = this.props
    const { sidebarOpened } = this.state

    return (
      <Media as={Sidebar.Pushable} at='mobile'>
        <Sidebar.Pushable>
          <Sidebar.Pusher dimmed={sidebarOpened}>
            <Segment
           
              textAlign='center'
              style={{ minHeight: '100vh', padding: '1em 0em' }}
              vertical
            >
              <Container>
          
              </Container>
              <HomepageHeading mobile />
            </Segment>

            {children}
          </Sidebar.Pusher>
        </Sidebar.Pushable>
      </Media>
    )
  }
}

MobileContainer.propTypes = {
  children: PropTypes.node,
}

const ResponsiveContainer = ({ children }) => (
  /* Heads up!
   * For large applications it may not be best option to put all page into these containers at
   * they will be rendered twice for SSR.
   */
  <MediaContextProvider>
    <Container id='allBack'>
    <DesktopContainer>{children}</DesktopContainer></Container>
    <Container id='allBack'> <MobileContainer>{children}</MobileContainer></Container>
   
  </MediaContextProvider>
)

ResponsiveContainer.propTypes = {
  children: PropTypes.node,
}

const HomepageLayout = () => (
<ResponsiveContainer/>
 
  
)

export default HomepageLayout