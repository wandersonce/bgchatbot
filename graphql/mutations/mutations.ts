import { gql } from '@apollo/client';

export const CREATE_CHATBOT = gql`
  mutation CreateChatbot(
    $clerk_user_id: String!
    $created_at: DateTime!
    $name: String!
  ) {
    insertChatbots(
      clerk_user_id: $clerk_user_id
      created_at: $created_at
      name: $name
    ) {
      id
      created_at
      name
    }
  }
`;

export const REMOVE_CHARACTERISTIC = gql`
  mutation RemoveCharacteristic($characteristicId: Int!) {
    deleteChatbot_characteristics(id: $characteristicId) {
      id
    }
  }
`;

export const DELETE_CHATBOT = gql`
  mutation DeleteChatbot($id: Int!) {
    deleteChatbot(id: $id) {
      id
    }
  }
`;
