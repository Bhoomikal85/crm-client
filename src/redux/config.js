import { io } from "socket.io-client";

export const url = "http://192.168.29.109:5000/api";
export const socket = io("http://192.168.29.109:3031");
