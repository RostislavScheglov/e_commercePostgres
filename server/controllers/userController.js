"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUser = exports.updateUser = exports.creatNewUser = void 0;
const postgresConfig_1 = __importDefault(require("../database/postgresConfig"));
const pg_1 = require("pg");
const bcrypt_1 = __importDefault(require("bcrypt"));
const creatNewUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { nickName, email, passw, isAdmin } = req.body;
        const passwrCrypt = yield bcrypt_1.default.hash(passw, yield bcrypt_1.default.genSalt(10));
        const newUser = yield postgresConfig_1.default.query('INSERT INTO usertable (nickName, email, passw, isAdmin) values ($1, $2, $3, $4) RETURNING *', [nickName, email, passwrCrypt, isAdmin]);
        res.status(200).json('ok');
    }
    catch (err) {
        if (err instanceof pg_1.DatabaseError) {
            if (err.code === '23505')
                return res
                    .status(500)
                    .json({ msg: 'This email or username are already existed' });
        }
        res.status(500).json([
            {
                msg: 'Registration faild',
            },
        ]);
    }
});
exports.creatNewUser = creatNewUser;
const updateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const { nickname, email, passw, isAdmin } = req.body;
        console.log(nickname, email, passw, isAdmin);
        const passwrCrypt = yield bcrypt_1.default.hash(passw, yield bcrypt_1.default.genSalt(10));
        const updatedUser = yield postgresConfig_1.default.query('UPDATE usertable SET nickname = $1, email = $2, passw = $3, isAdmin = $4 WHERE user_idd = $5 RETURNING *', [nickname, email, passwrCrypt, isAdmin, id]);
        res.status(200).json('ok');
    }
    catch (err) {
        if (err instanceof pg_1.DatabaseError) {
            if (err.code === '23505')
                return res
                    .status(500)
                    .json({ msg: 'This email or username are already existed' });
        }
        res.status(500).json([
            {
                msg: 'User info update failed',
            },
        ]);
    }
});
exports.updateUser = updateUser;
const deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { nickName, email, passw, isAdmin } = req.body;
        const newUser = yield postgresConfig_1.default.query('INSERT INTO usertable (nickName, email, passw, isAdmin) values ($1, $2, $3, $4) RETURNING *', [nickName, email, passw, isAdmin]);
        res.status(200).json('ok');
    }
    catch (err) {
        if (err instanceof pg_1.DatabaseError) {
            if (err.code === '23505')
                return res
                    .status(500)
                    .json({ msg: 'This email or username are already existed' });
        }
        res.status(500).json([
            {
                msg: 'Registration faild',
            },
        ]);
    }
});
exports.deleteUser = deleteUser;
