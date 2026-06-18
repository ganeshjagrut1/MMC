/**
 * Database types for the medical college site.
 * Keep these in sync with supabase/schema.sql.
 * (You can later auto-generate with: supabase gen types typescript)
 */

export type Department = {
  id: string;
  slug: string;
  name: string;
  short_description: string | null;
  description: string | null;
  icon: string | null;
  image_url: string | null;
  sort_order: number;
  created_at: string;
};

export type Faculty = {
  id: string;
  name: string;
  designation: string | null;
  department: string | null;
  qualifications: string | null;
  bio: string | null;
  photo_url: string | null;
  email: string | null;
  sort_order: number;
  created_at: string;
};

export type News = {
  id: string;
  slug: string;
  title: string;
  excerpt: string | null;
  content: string | null;
  cover_image_url: string | null;
  category: string | null;
  published: boolean;
  published_at: string | null;
  created_at: string;
};

export type Notice = {
  id: string;
  title: string;
  body: string | null;
  link: string | null;
  pinned: boolean;
  created_at: string;
};

export type SiteContent = {
  key: string;
  data: Record<string, unknown>;
  updated_at: string;
};

export type ContactMessage = {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  subject: string | null;
  message: string;
  handled: boolean;
  created_at: string;
};

type Row<T> = T;
// Keys whose value can be null are optional on insert (DB stores null).
type NullableKeys<T> = {
  [K in keyof T]-?: null extends T[K] ? K : never;
}[keyof T];
// Required = everything except generated/defaulted and nullable columns.
type Insert<T, Generated extends keyof T> = Omit<
  T,
  Generated | NullableKeys<T>
> &
  Partial<Pick<T, (Generated & keyof T) | NullableKeys<T>>>;

type NoRel = { Relationships: [] };

export type Database = {
  public: {
    Tables: {
      departments: {
        Row: Row<Department>;
        Insert: Insert<Department, "id" | "created_at" | "sort_order">;
        Update: Partial<Department>;
      } & NoRel;
      faculty: {
        Row: Row<Faculty>;
        Insert: Insert<Faculty, "id" | "created_at" | "sort_order">;
        Update: Partial<Faculty>;
      } & NoRel;
      news: {
        Row: Row<News>;
        Insert: Insert<News, "id" | "created_at">;
        Update: Partial<News>;
      } & NoRel;
      notices: {
        Row: Row<Notice>;
        Insert: Insert<Notice, "id" | "created_at">;
        Update: Partial<Notice>;
      } & NoRel;
      site_content: {
        Row: Row<SiteContent>;
        Insert: Insert<SiteContent, "updated_at">;
        Update: Partial<SiteContent>;
      } & NoRel;
      contact_messages: {
        Row: Row<ContactMessage>;
        Insert: Insert<ContactMessage, "id" | "created_at" | "handled">;
        Update: Partial<ContactMessage>;
      } & NoRel;
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: Record<string, never>;
    CompositeTypes: Record<string, never>;
  };
};
