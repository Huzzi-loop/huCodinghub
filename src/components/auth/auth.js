import React, { useState,useRef, useEffect } from 'react';
import './auth.css';
import { useSpring, animated } from 'react-spring';
import axios from 'axios';

function Auth(props) {
    
    const [state,setstate]=useState(false);
    const SignInView = useRef(null);
    const SignUpView = useRef(null);

    const [name,setName]=useState('');
    const [mobile,setMobile]=useState('');
    const [email,setEmail]=useState('');
    const [password,setPassword]=useState('');
    const [cpassword,setCPassword]=useState('');

    const [message,setMessage]=useState('');

    const preventScroll=useRef(null);

    useEffect(()=>{
        preventScroll.current.addEventListener('wheel',disableSCroll);
        return ()=>{
            preventScroll.current.removeEventListener('wheel',disableSCroll)
        }
    });

    useEffect(()=>{
        setName('');
        setMobile('');
        setEmail('');
        setPassword('');
        setCPassword('');
        setMessage('');
    },[])

    const disableSCroll=(e)=>{
        e.preventDefault();
    }

    //animation for animating the bubble across the screen
    const bubbleAnimation = useSpring({
        transform: state ? `translate3d(100%,0,0)` : `translate3d(0%,0,0)`,
        config:{duration:2000}
    });

    //animation for animating the Sign In Form
    const signInFormAnimation = useSpring({
        transform: state ? `translate3d(0%,0,0)` : `translate3d(10%,0,0)`,
        config:{duration:1500}
    });

    //animation for animating the Sign Up Form
    const signUpFormAnimation = useSpring({
        transform: state ? `translate3d(-10%,0,0)` : `translate3d(0%,0,0)`,
        config:{duration:1500}
    });

    const toggle=()=>{
        setstate((state)=>!state)
        //code to move the screen along the bubble
        if(!state){
            SignUpView.current.scrollIntoView({ behavior: 'auto'});
        }else{
            SignInView.current.scrollIntoView({ behavior: 'auto'})
        }
        cleanUpData();
        setMessage('');
    }

    //fuction to handle signing in 
    const signIn=async ()=>{
        try{
            const get = await axios.post('http://localhost/codinghub/credential/signin.php',{
                email,
                password
            });
            if(get['data']['success']===true){
                setMessage('');
            }else{
                setMessage(get['data']['message']);
            }
        }catch(err){
            console.log(err);
        }
        cleanUpData();
    }


    //functoin to handle signing up
    const signUp=async ()=>{
        if(checkDetails()){
            try{
                const get = await axios.post('http://localhost/codinghub/credential/signup.php',{
                    name,
                    email,
                    mobile,
                    password
                });
                if(get['data']['success']){
                    console.log(get['data']['message']);
                    setMessage('');
                }else{
                    setMessage(get['data']['message'])
                    console.log(get['data']['message']);
                }
            }catch(err){
                console.log(err);
            }
            cleanUpData();
        }
    }

    //fucntion to re-initialise data after signin/signup
    const cleanUpData=()=>{
        setName('');
        setMobile('');
        setEmail('');
        setPassword('');
        setCPassword('');
    }

    //function to check for validity of details entered during signup
    const checkDetails=()=>{
        const c1=password.length>=8?true:false;
        var re = /^(?=.*\d)(?=.*[a-zA-Z])/;
        const c2=re.test(password);
        const c3=password===cpassword?true:false;
        const c4=name!==''?true:false;
        const c5=email!==''?true:false;
        const c6=mobile!==''?true:false;

        console.log(c1,c2,c3);

        if(c1 && c2 && c3 && c4 && c5){
            return true;
        }else if(!c4){
            setMessage('Enter your name');
        }else if(!c5){
            setMessage('Enter your email');
        }else if(!c6){
            setMessage('Enter your mobile number');
        }else if(!c1){
            setMessage('Password length should be minimum of 8 characters');
        }else if(!c2){
            setMessage('Password contains some illegal characters');
        }else if(!c3){
            setMessage('Passwords do not match');
        }
        return false;
    }

    return (
        <div style={{overflow:'auto',blockSize:1.9*window.innerWidth}} ref={preventScroll}>
            <animated.div className="moving-ball" style={bubbleAnimation}>
            </animated.div>
            <div className="main-auth" style={{width:1.9*window.innerWidth,maxHeight:window.innerHeight,display:'flex',flexDirection:'row',flexWrap: 'nowrap'}}>
                
                <div style={styles.divSignIn} ref={SignInView}>

                    <div style={{flex:'1',overflow:'hidden',display:'flex',zIndex:100,flexDirection:'column'}}>
                        <div style={{flex:'1',display:'flex',flexDirection:'row'}}>
                            <div style={{flex:'1'}}>
                            </div>
                            <div style={{flex:'1',justifyContent:'center',alignSelf:'center'}}>
                                <h4 style={{color:'white'}}>New here ?</h4>
                                <span style={{color:'white'}}>Then Sign Up and Start Ordering!</span><br/>
                                <input type="submit" className="btn2 solid" value="Sign Up" onClick={()=>toggle()} />
                            </div>
                        </div>
                        <div style={{flex:'1',display:'flex',justifyContent:'flex-end'}}>
                            <img src={require('../../signin.svg')} className="image"  alt=""/>
                        </div>
                    </div>

                    <animated.div className="divforms" style={signInFormAnimation}>
                        <form>
                            <h2 className="title" style={{fontFamily:'poppins'}}>Sign in</h2>
                            <div className="input-field">
                                <i className="fas fa-user" aria-hidden="true"></i>
                                <input name="email" type="email" placeholder="Email" value={email} onChange={(e)=>setEmail(e.target.value)}/>
                            </div>
                            <div className="input-field">
                                <i className="fas fa-lock" aria-hidden="true"></i>
                                <input name="password" type="password" placeholder="Password" value={password} onChange={(e)=>setPassword(e.target.value)}/>
                            </div>
                                <input type="submit" className="btn solid" value="Sign In" onClick={(e)=>{e.preventDefault();signIn()}}/>
                                <a href="/forget" style={{fontFamily:'poppins'}}>
                                    Forgot Password?
                                </a>
                                {message===''?(<></>):(<p style={{color:'red'}}>{message}</p>)}
                        </form>
                    </animated.div>
                </div>
                
                <div style={styles.divSignUp} ref={SignUpView}>

                    <animated.div className="divforms" style={signUpFormAnimation}>
                        <form>
                            <h2 className="title" style={{fontFamily:'poppins'}}>Sign Up</h2>
                            <div className="input-field">
                                <i className="fas fa-user" aria-hidden="true"></i>
                                <input name="name" type="text" placeholder="Name" value={name} onChange={(e)=>setName(e.target.value)}/>
                            </div>
                            <div className="input-field">
                                <i className="fas fa-envelope" aria-hidden="true"></i>
                                <input name="email" type="email" placeholder="Email" value={email} onChange={(e)=>setEmail(e.target.value)}/>
                            </div>
                            <div className="input-field">
                                <i className="fas fa-phone" aria-hidden="true"></i>
                                <input name="contact" type="contact" placeholder="Contact Number" value={mobile} onChange={(e)=>setMobile(e.target.value)}/>
                            </div>
                            <div className="input-field">
                                <i className="fas fa-lock" aria-hidden="true"></i>
                                <input name="password" type="password" placeholder="Password" value={password} onChange={(e)=>setPassword(e.target.value)}/>
                            </div>
                            <div className="input-field">
                                <i className="fas fa-lock" aria-hidden="true"></i>
                                <input name="rpassword" type="password" placeholder="Conform Password" value={cpassword} onChange={(e)=>setCPassword(e.target.value)}/>
                            </div>
                                <input type="submit" className="btn solid" value="Sign Up" onClick={(e)=>{e.preventDefault();signUp()}}/>
                                {message===''?(<></>):(<p style={{color:'red'}}>{message}</p>)}
                        </form>
                    </animated.div>

                    <div style={{flex:'1',overflow:'hidden',display:'flex',zIndex:100,flexDirection:'column'}}>
                        <div style={{flex:'1',display:'flex',flexDirection:'row'}}>
                            <div style={{flex:'1'}}>
                            </div>
                            <div style={{flex:'1',justifyContent:'center',alignSelf:'center'}}>
                                <h4 style={{color:'white'}}>One of us ?</h4>
                                <span style={{color:'white'}}>Then Sign In and get Started!</span><br/>
                                <input type="submit" className="btn2 solid" value="Sign In" onClick={()=>toggle()} />
                            </div>
                        </div>
                        <div style={{flex:'1',display:'flex',justifyContent:'flex-end'}}>
                            <img src={require('../../signup.svg')} className="image"  alt=""/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}


//styles used in for parameters fetched in javascript like screen width and height
const styles = {
    divSignIn:{
        display:'flex',
        width:0.9*window.innerWidth,
        height:window.innerHeight,
        // backgroundColor:'blue'
    },
    divSignUp:{
        display:'flex',
        width:0.9*window.innerWidth,
        height:window.innerHeight,
    }
}

export default Auth;