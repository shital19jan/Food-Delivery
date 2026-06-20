import UserRepository from "../repositories/UserRepository";
import MESSAGES from "../constants/Messages";
import ConflictError from '../utils/errors/ConflictErrors'
import InternalServerError from "../utils/errors/InternalServerError";
import NotFoundError from "../utils/errors/NotFoundErrors";
import User from "../models/User.Model";


class UserService {
    public userRepository: UserRepository;

    constructor() {
        this.userRepository = new UserRepository();
    }

    async createUser(userData: any) {
        const existingUser = await this.userRepository.findByEmail(userData.email);
        if (existingUser) {
            throw new ConflictError(MESSAGES.ALREADY_EXISTS);
        }

        const savedUser = await this.userRepository.create(userData);
        return savedUser;
    }





    async getAllUsers(filter: any = {}, options: any = {}) {
        const users = await this.userRepository.findAll(filter, options);
        return users;

    }

    async getuserById(id: string) {
        try {
            const user = await this.userRepository.findById(id);
            if (!user) {
                throw new NotFoundError(MESSAGES.NOT_FOUND);
            }
            return user;
        } catch (error: any) {
            throw new InternalServerError(MESSAGES.INTERNAL_SERVER_ERROR);
        }
    }

    async getUserByEmail(email: string) {
        const user = await this.userRepository.findByEmail(email);
        if (!user) {
            throw new NotFoundError(MESSAGES.NOT_FOUND);
        }
        return user;
    }

    async updateUser(id: string, updatedData: any) {
        try {
            const user = await this.userRepository.updateById(id, updatedData);
            if (!user) {
                throw new NotFoundError(MESSAGES.NOT_FOUND);
            }
            return user;
        } catch (error: any) {
            throw new InternalServerError(MESSAGES.INTERNAL_SERVER_ERROR)
        }
    }

    async deletUser(id: string) {
        try {
            const user = await this.userRepository.deleteById(id);
            if (!user) {
                throw new NotFoundError(MESSAGES.NOT_FOUND);
            }
        } catch (error: any) {
            throw new InternalServerError(MESSAGES.INTERNAL_SERVER_ERROR)

        }
    }

    async activateUser(id: string) {
        const user = await this.userRepository.findById(id);

        if (!user) {
            throw new Error("user not found");
        }
        if (user.status === "ACTIVE") {
            throw new Error("User is already active");
        }
        if (user.status === "BLOCKED") {
            throw new Error("Blocked user can not be activated");
        }
        if (user.status === "INACTIVE" || user.status === "PENDING") {
            user.status = "ACTIVE";
            await user.save();
        }
        return user;

    }
}

export default UserService;