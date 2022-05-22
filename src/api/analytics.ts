import { io, Socket } from 'socket.io-client';
import { useCallback, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

export default function useAnalytics() {
    const [socket, setSocket] = useState<Socket | undefined>(undefined)

    const location = useLocation()
    const sendPageview = useCallback(() => {
        if (!socket) return
        socket.emit('pageview', {
            path: location.pathname,
        })
    }, [location.pathname, socket])

    useEffect(() => {
        const s = io("https://analytics.06072022.xyz", {
            // required for CORS
            withCredentials: true,
            // WebSockets are much lighter on our server than polling, so prioritise them
            transports: ['websocket', 'polling'],
        })
        setSocket(s)

        s.on('reconnect', sendPageview)
        return () => {
            s.off('reconnect', sendPageview)
            s.close()
        }
    }, [])

    useEffect(() => {
        sendPageview()
    }, [location.pathname, socket])
}
