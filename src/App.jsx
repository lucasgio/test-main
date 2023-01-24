
import {useState} from "react";
import Pusher from "pusher-js";

export default function App() {
    const id = JSON.parse(localStorage.getItem('user'));
    const getToken = JSON.parse(localStorage.getItem('token'))

    const pusher = new Pusher('81d2197bd54662af7ed3', {
        cluster: 'us2',
        authEndpoint: `http://videeo.online/broadcasting/auth`,
        auth: {
            headers: {
                "Authorization": `Bearer ${getToken}`,
            }
        }
    });


    const [messages, setMessages] = useState([]);

    pusher.subscribe(`private-message.${id}`);
    pusher.bind("message", (data) => setMessages([...messages, data]));



    pusher.subscribe(`private-allMessage.${id}`)
    pusher.bind('getMessage', (data) => setMessages(data))


    return (
        <div className="flex flex-col items-center justify-center w-screen min-h-screen bg-gray-100 text-gray-800 p-10">
            <div className="flex flex-col flex-grow w-full max-w-xl bg-white shadow-xl rounded-lg overflow-hidden">
                {/* Render component */}
                <div className="bg-gray-300 p-4">
                    <p className="text-lg">{`Usuario: ${id}`}</p>
                </div>
                {messages.map((message) => {
                    return (
                        <div key={message.id} className="flex flex-col flex-grow justify-end h-0 p-4 overflow-auto">
                            <div className="flex w-1/2 mt-2 space-x-3 max-w-xs">
                                <div className="flex-shrink-0 h-10 w-10 rounded-full bg-gray-300"></div>
                                <div>
                                    <div className="bg-gray-300 p-3 rounded-r-lg rounded-bl-lg">
                                        <p className="text-sm">
                                            {message.message}
                                        </p>
                                    </div>
                                    <span className="text-xs text-gray-500 leading-none">
                    {message.from_user}
                  </span>

                                </div>
                            </div>
                        </div>
                    );
                })}

                <div className="bg-gray-300 p-4">
                    <input
                        className="flex items-center h-10 w-full rounded px-3 text-sm"
                        type="text"
                        placeholder="Type your message…"
                    />
                </div>
            </div>
        </div>
    );
}
