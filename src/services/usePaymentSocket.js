// usePaymentSocket.js
import { useEffect } from "react";
import SockJS from "sockjs-client";
import { Client } from "@stomp/stompjs";

export default function usePaymentSocket(userId, onMessage) {
  useEffect(() => {
    const socketUrl = "http://localhost:8080/ws"; // endpoint WebSocket trong Spring Boot

    const client = new Client({
      webSocketFactory: () => new SockJS(socketUrl),
      reconnectDelay: 5000,
      onConnect: () => {
        console.log("✅ Connected to WebSocket");
        client.subscribe(`/topic/payment/${userId}`, (message) => {
          const body = JSON.parse(message.body);
          onMessage(body);
        });
      },
      onStompError: (frame) => {
        console.error("Broker error:", frame.headers["message"]);
      },
    });

    client.activate();

    return () => {
      client.deactivate();
    };
  }, [userId, onMessage]);
}
