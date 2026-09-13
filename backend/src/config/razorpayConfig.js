import razorpay from 'razorpay';

import { RAZORPAY_KEY_ID, RAZORPAY_SECRET_KEY } from './serverConfig.js';

console.log("Razorpay Key ID loaded:", RAZORPAY_KEY_ID);
console.log("Razorpay Secret loaded:", !!RAZORPAY_SECRET_KEY);

const instance = new razorpay({
    key_id: RAZORPAY_KEY_ID,
    key_secret: RAZORPAY_SECRET_KEY
});

export default instance;