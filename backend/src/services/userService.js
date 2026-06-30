import bcrypt from 'bcrypt'
import { StatusCodes } from "http-status-codes";

import userRepository from "../repositories/userRepository.js"
import { createJWT } from "../utils/common/authUtils.js";
import ClientError from "../utils/errors/clientError.js";
import ValidationError from "../utils/errors/validationError.js";

export const signUpService = async (data) => {
    try {
        const newUser = await userRepository.create(data);
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

