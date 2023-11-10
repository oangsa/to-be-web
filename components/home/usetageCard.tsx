import {Card, CardBody} from '@nextui-org/react';
import React, { useEffect, useState } from 'react';
import hasCookie from '@/libs/hasCookie';

export const UsetageCard = (props:any) => {
    const [isCookie, setIsCookie] = useState<boolean>(false)

    const getD = async () => {
        const cookie: boolean = hasCookie("user-tokrn")
        if (cookie === false) return setIsCookie(false)
        return setIsCookie(true)
    }

    useEffect(() => {
        getD()
    })
    
    return (
        <Card className="xl:max-w-sm bg-primary rounded-xl shadow-md px-3 w-full">
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
                                    <span className="text-lg text-white" >
                                        เข้าใช้งานทั้งหมด {props?.props.total} ครั้ง
                                    </span>
                                </div>
                        </div>
                    </>
                    }
                </CardBody>
        </Card>
        );
};