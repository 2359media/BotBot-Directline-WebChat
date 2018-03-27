import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Chat, ChatProps } from './Chat';
import * as konsole from './Konsole';

import { PRODUCTION_SHORT_URL, SECRET, PARENT_ORIGIN } from './Constants';
export type AppProps = ChatProps;


export const App = (props: AppProps, container: HTMLElement) => {
    konsole.log("BotChat.App props", props);
    ReactDOM.render(React.createElement(AppContainer, props), container);
}

function uuidv4(): string {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}

function getAppProps() : Object {
    var params = BotChat.queryParams(location.search);

    var user = {
        id: params['userid'] || uuidv4(),
        name: params["username"] || 'user'
    };

    var bot = {
        id: params['botid'] || 'botid',
        name: params["botname"] || 'botname'
    };

    return {
        directLine: {
            secret: window.location.hostname.indexOf(PRODUCTION_SHORT_URL) === -1 ? SECRET.STAGING : SECRET.PRODUCTION,
            token: params['t'],
            domain: params['domain'],
            webSocket: params['webSocket'] && params['webSocket'] === 'true'
        },
        user: user,
        bot: bot,
        locale: params['locale'],
        resize: 'window'
        // sendTyping: true,    // defaults to false. set to true to send 'typing' activities to bot (and other users) when user is typing
    }
}

const AppContainer = (props: AppProps) => {
    return  <div className="wc-app">
        <Chat { ...props } {...getAppProps()} />
    </div>
}
