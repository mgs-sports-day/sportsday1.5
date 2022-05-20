import { io, Socket } from 'socket.io-client';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

export default function useAnalytics() {
    const [socket, setSocket] = useState<Socket | undefined>(undefined)

    const location = useLocation()
    useEffect(() => {
        const s = io("https://SportsDayAnalytics.palk.repl.co", {
            // required for CORS
            withCredentials: true,
            // WebSockets are much lighter on our server than polling, so prioritise them
            transports: ['websocket', 'polling'],
        })
        setSocket(s)
        return () => {
            s.close()
        }
    }, [])

    useEffect(() => {
        if (!socket) return
        socket.emit('pageview', {
            path: location.pathname,
        })
    }, [location.pathname, socket])
}
