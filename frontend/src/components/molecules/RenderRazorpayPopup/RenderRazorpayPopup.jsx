import { useEffect, useState } from "react";

const loadRazorpayScript = (src) => {
    return new Promise((res, rej) => {
        const script = document.createElement('script');
        script.src = src;
        script.onload = () => {
            console.log('Razorpay script loaded');
            res(true);
        };
        script.onerror = () => {
            console.log('Error in loading Razorpay script');
            res(false);
        };
        document.body.appendChild(script);
    })
}

export const RenderRazorpayPopup = ({
    orderId,
    keyId,
    keySecret,
    currency,
    amount
}) => {
    
    const display = async (options) => {
        const scriptResponse = await loadRazorpayScript('https://checkout.razorpay.com/v1/checkout.js');
        if(!scriptResponse) {
            console.log('Error in loading script');
            return;
        }

        const rzp = new window.Razorpay(options);

        rzp.on('payment.failed',async function (response){
            console.log('Payment failed', response.error.code);
            await captureOrderMutation({
                orderId: options.order_id,
                status: 'failed',
                paymentId: '',
            });
        });

        rzp.open();
    }

    useEffect(() => {
        display({
            key: keyId,
            amount,
            currency,
            name: "Pramod Yadav", // name of the company
            description: "Test Transaction",
            order_id: orderId,
        })
        
    }, [orderId]);

    return null;
}