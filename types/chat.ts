export interface GroupMessage {
  id: string;
  group_id: string;
  sender_id: string;
  message: string;
  created_at: string;
  sender?: {
    id: string;
    email: string;
    full_name: string;
    role: string;
    image_url?: string;
  };
}

export interface TeacherInsight {
  id: string;
  user_id?: string; // Optional as it might not be in the response
  group_name: string;
  group_des: string;
  image_url?: string;
  subject?: string;
  owner?: {
    id: string;
    email: string;
    name: string;
  };
}

// Responses
export interface GroupMessageListResponse {
  messages: GroupMessage[];
}

export interface GroupListResponse {
  groups: TeacherInsight[];
}
