import {Card, CardBody} from '@nextui-org/react';
import React, { useEffect, useState } from 'react';
import { CookieValueTypes, getCookie } from 'cookies-next';

export const GreetCard = (props:any) => {
    const [isCookie, setIsCookie] = useState<boolean>(false)

    const getD = async () => {
        const cookie: CookieValueTypes | undefined = getCookie("user-token")
        if (cookie === undefined) return setIsCookie(false)
        return setIsCookie(true)
    }

    useEffect(() => {
        getD()
    })
    
    return (
        <Card className="xl:max-w-sm bg-secondary rounded-xl shadow-md px-3 w-full">
            <CardBody className="py-5">
            { props?.props === undefined && isCookie === false ? 
                <span className="text-2xl text-white">
                    กรุณาลงชื่อเข้าใช้
                </span>
                : ( isCookie === true && props?.props === undefined ) ? 
                    <span className="text-lg text-black">
                        loading...
                    </span>  
                : 
                    <>
                        <div className= "flex">
                                <div className= "flex content-center">
                                    <span className="text-xl text-white" >
                                        สวัสดี {props.props.name} {props.props.surname} 👋
                                    </span>
                                </div>
                        </div>
                    </>
                    }
                </CardBody>
        </Card>
    );
};