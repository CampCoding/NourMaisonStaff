export interface Category {
  id: string;
  label: string;
}

export interface Video {
  id: string;
  category: string;
  title: string;
  subtitle: string;
  duration: string;
  thumbnail: string;
  instructor: string;
  watched: boolean;
  featured: boolean;
  description: string;
}

export interface CategoryPillProps {
  item: Category;
  selected: boolean;
  onPress: () => void;
}

export interface VideoCardProps {
  video: Video;
  onPress: (video: Video) => void;
}
