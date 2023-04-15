import { React, useEffect } from 'react';
import { Header } from '../../components/layout/Header';
import Head from 'next/head';
import isServer from '../../components/isServer';
export default function Login() {
    if (!isServer()) {
        const regex = /\[(.*)\]/g;
        const str = decodeURIComponent(window.location.search);
        let m;
        let redirecting = "";
        while ((m = regex.exec(str)) !== null) {
            // This is necessary to avoid infinite loops with zero-width matches
            if (m.index === regex.lastIndex) {
                regex.lastIndex++;
            }
            redirecting = m[1];
        }
    
    }

    async function TypeSet(e) {
        window.localStorage.setItem("Type", e.target.getAttribute("type"));
        await onClickConnect()
        window.location.href = redirecting;
    }

    async function onClickConnect() {
        await window.tronWeb.request({ method: 'tron_requestAccounts' });
        if (window?.tronWeb?.defaultAddress?.base58 != null) {
            window.localStorage.setItem('login-type', "tronlink");

        } 
    }


    useEffect(() => {
        if (!isServer()) {
            setInterval(() => {
                if (window.localStorage.getItem("login-type") == "tronlink") {
                    window.location.href = redirecting;
                }
            }, 1000);
        }
    }, []);
    if (isServer()) return null;

    function EventManger() {
        if (window.localStorage.getItem("Type") == "manager") {
            return (<>
                <div type="manager" onClick={TypeSet} className='Login eventManagerButton active'>
                    <span type="manager" style={{ color: "yellow" }}>Event Manager</span>
                </div>
            </>)
        }
        return (<>
            <div type="manager" onClick={TypeSet} className='Login eventManagerButton'>
                <span type="manager" style={{ color: "yellow" }}>Event Manager</span>
            </div>
        </>)
    }
    function DonatorType() {
        if (window.localStorage.getItem("Type") == "Donator") {
            return (<>
                <div type="Donator" onClick={TypeSet} className='Login userButton active'>
                    <span type="Donator" style={{ color: "black" }}>Donator</span>
                </div>
            </>)
        }
        return (<>
            <div type="Donator" onClick={TypeSet} className='Login userButton'>
                <span type="Donator" style={{ color: "black" }}>Donator</span>
            </div>
        </>)

    }
    return (
        <><>
            <Head>
                <title>Login</title>
                <meta name="description" content="Login" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Header></Header>
            <div className="Login row">
                <div className="Login col">
                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                        <div className='Login container' style={{ background: "transparent", padding: "19px", borderRadius: "4px", height: "100%", border: "white solid" }}>
                            <div style={{ margin: "0px 0px 30px 0px" }}>
                                <h1 style={{ marginBottom: "10px" }}>Login</h1>
                            </div>

                            <div style={{ margin: "18px 0px", display: "flex", justifyContent: "space-between" }} >
                                <EventManger />
                                <DonatorType />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </></>
    );
}