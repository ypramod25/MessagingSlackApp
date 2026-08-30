import bcrypt from 'bcrypt'
import { StatusCodes } from "http-status-codes";

import { ENABLE_EMAIL_VERIFICATION } from '../config/serverConfig.js';
import { addEmailToMailQueue } from '../producers/mailQueueProducers.js';
import userRepository from "../repositories/userRepository.js"
import { createJWT } from "../utils/common/authUtils.js";
import { verifyEmailMail } from '../utils/common/mailObject.js';
import ClientError from "../utils/errors/clientError.js";
import ValidationError from "../utils/errors/validationError.js";

export const signUpService = async (data) => {
    try {  
        const newUser = await userRepository.create(data);

        if(ENABLE_EMAIL_VERIFICATION === 'true') {
            //send the email verification mail
             addEmailToMailQueue({
                ...verifyEmailMail(newUser.verificationToken),
                to: newUser.email
            });
        }

        return newUser;
    } catch (error) {
        console.log('User service error', error);
        if(error.name === 'ValidationError') {
            throw new ValidationError({
                error: error.errors
            }, error.message);
        } else if(error.name === 'MongoServerError' && error.code === 11000) {
            throw new ValidationError(
                {
                    error: ['A user with same email or username already exists']
                },
                'A user with same email or username already exits'
            );
        }
        throw error;
    }
};

export const verifyTokenService = async (token) => {
    try {
        const user = await userRepository.getByToken(token);        
        if(!user) {
            throw new ClientError({
                explanation: 'Invalid Data send from the client',
                message: 'No registered user found with this token',
                statusCode: StatusCodes.NOT_FOUND
            });
        }
        //check if token is expired or not 
        
        if(user.verificationTokenExpiry < Date.now()) {
            throw new ClientError({
                explanation: 'Invalid data sent from client , token expired',
                message: 'Token expired',
                statusCode: StatusCodes.BAD_REQUEST
            })
        }

        user.isVerified = true;
        user.verificationToken = null;
        user.verificationTokenExpiry = null;
        await user.save();

        return user;

    } catch (error) {
        console.log('Error in verifying the token service', error);
        throw error;
    }
}

export const signInService = async (data) => {
    try{

        //1. get user by email
        const user = await userRepository.getByEmail(data.email);
        if(!user) {
            throw new ClientError({
                explanation: 'Invalid Data send from the client',
                message: 'No registered user found with this email',
                StatusCodes: StatusCodes.NOT_FOUND
            });
        }

        //2. match incoming password with hashed password
        const isMatch = bcrypt.compareSync(data.password, user.password);
        if(!isMatch) {
            throw new ClientError({
                explanation: 'Invalid data send from the client',
                message: 'Invalid password, please try again',
                statusCodes: StatusCodes.BAD_REQUEST
            })
        }

        //3. create jwt token and return it
        return {
            username: user.username,
            avatar: user.avatar,
            email: user.email,
            _id:user._id,
            token: createJWT({id:user._id, email: user.email})
        }

    } catch (error) {
        console.log('User service error', error);
        throw error;
    }
}

