import React from 'react';
import { GiftedChat } from 'react-native-gifted-chat';
import FireChat from 'src/firebase/FireChat';

type Props = {
    name?: string,
  };
  
  class Chat extends React.Component<Props> {
  
    state = {
      messages: [],
    };
  
    get user() {
      return {
        name: this.props.navigation.state.params.name,
        _id: FireChat.shared.uid,
      };
    }
  
    render() {
      return (
        <GiftedChat
          messages={this.state.messages}
          onSend={FireChat.shared.send}
          user={this.user}
        />
      );
    }
  
    componentDidMount() {
      FireChat.shared.on(message =>
        this.setState(previousState => ({
          messages: GiftedChat.append(previousState.messages, message),
        }))
      );
    }
    componentWillUnmount() {
      FireChat.shared.off();
    }
  }

  export default Chat;