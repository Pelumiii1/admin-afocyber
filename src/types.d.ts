export interface User {
  id: string;
  firstname: string;
  lastname: string;
}

interface Post {
  id: string;
  title: string;
  description: string;
  content: string;
  image_url?: string;
}
