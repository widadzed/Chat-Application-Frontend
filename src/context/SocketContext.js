import React from "react";
import socketio from "socket.io-client";
const socketUri = import.meta.env.VITE_SOCKET_URI;

export const socket = socketio.connect(socketUri);
export const SocketContext = React.createContext();