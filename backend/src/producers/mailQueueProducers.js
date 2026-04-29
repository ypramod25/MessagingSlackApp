import mailQueue from "../queues/mailQueue.js";

// export const addEmailToMailQueue = async (emailData) => {
//     console.log('Initiating email sending process');
//     try {
//         await mailQueue.add(emailData);
//         console.log('Email added to mail queue:', emailData);
//     } catch (error) {
//         console.error('Error adding email to mail queue:', error);
//     }
// };
export const addEmailToMailQueue = async (emailData) => {
    console.log('Initiating email sending process');
    try {
        await mailQueue.add('sendEmail', emailData); // ✅ FIXED
        console.log('Email added to mail queue:', emailData);
    } catch (error) {
        console.error('Error adding email to mail queue:', error);
    }
};