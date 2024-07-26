export type Type = "landing_page" | "search";

export type ResultLinks = {
  self:              string;
  html:              string;
  download:          string;
  download_location: string;
}

export type Category = {
  slug:        string;
  pretty_slug: string;
}

export type Ancestry = {
  type:         Category;
  category:     Category;
  subcategory?: Category;
}

export type Status = "approved" | "rejected";

export type FoodDrink = {
  status:       Status;
  approved_on?: Date;
}

export type CoverPhotoTopicSubmissions = {
  health?:              FoodDrink;
  "color-of-water"?:    FoodDrink;
  "textures-patterns"?: FoodDrink;
}

export type Urls = {
  raw:      string;
  full:     string;
  regular:  string;
  small:    string;
  thumb:    string;
  small_s3: string;
}

export type UserLinks = {
  self:      string;
  html:      string;
  photos:    string;
  likes:     string;
  portfolio: string;
  following: string;
  followers: string;
}

export type ProfileImage = {
  small:  string;
  medium: string;
  large:  string;
}

export type Social = {
  instagram_username: null | string;
  portfolio_url:      null | string;
  twitter_username:   null | string;
  paypal_email:       null;
}

export type User = {
  id:                           string;
  updated_at:                   Date;
  username:                     string;
  name:                         string;
  first_name:                   string;
  last_name:                    string;
  twitter_username:             null | string;
  portfolio_url:                null | string;
  bio:                          null | string;
  location:                     null | string;
  links:                        UserLinks;
  profile_image:                ProfileImage;
  instagram_username:           null | string;
  total_collections:            number;
  total_likes:                  number;
  total_photos:                 number;
  total_promoted_photos:        number;
  total_illustrations:          number;
  total_promoted_illustrations: number;
  accepted_tos:                 boolean;
  for_hire:                     boolean;
  social:                       Social;
}

export type AssetType = "photo";

export type Breadcrumb = {
  slug:  string;
  title: string;
  index: number;
  type:  Type;
}

export type AlternativeSlugs = {
  en: string;
  es: string;
  ja: string;
  fr: string;
  it: string;
  ko: string;
  de: string;
  pt: string;
}

export type CoverPhoto = {
  id:                       string;
  slug:                     string;
  alternative_slugs:        AlternativeSlugs;
  created_at:               Date;
  updated_at:               Date;
  promoted_at:              Date | null;
  width:                    number;
  height:                   number;
  color:                    string;
  blur_hash:                string;
  description:              null | string;
  alt_description:          string;
  breadcrumbs:              Breadcrumb[];
  urls:                     Urls;
  links:                    ResultLinks;
  likes:                    number;
  liked_by_user:            boolean;
  current_user_collections: string[];
  sponsorship:              null;
  topic_submissions:        CoverPhotoTopicSubmissions;
  asset_type:               AssetType;
  premium:                  boolean;
  plus:                     boolean;
  user:                     User;
}

export type Source = {
  ancestry:         Ancestry;
  title:            string;
  subtitle:         string;
  description:      string;
  meta_title:       string;
  meta_description: string;
  cover_photo:      CoverPhoto;
}

export type Tag = {
  type:    Type;
  title:   string;
  source?: Source;
}

export type ResultTopicSubmissions = {
  "food-drink"?: FoodDrink;
}

export type Result = {
  id:                       string;
  slug:                     string;
  alternative_slugs:        AlternativeSlugs;
  created_at:               Date;
  updated_at:               Date;
  promoted_at:              Date | null;
  width:                    number;
  height:                   number;
  color:                    string;
  blur_hash:                string;
  description:              null | string;
  alt_description:          string;
  breadcrumbs:              Breadcrumb[];
  urls:                     Urls;
  links:                    ResultLinks;
  likes:                    number;
  liked_by_user:            boolean;
  current_user_collections: string[];
  sponsorship:              null;
  topic_submissions:        ResultTopicSubmissions;
  asset_type:               AssetType;
  user:                     User;
  tags:                     Tag[];
}

export type ImagesSearch = {
  total:       number;
  total_pages: number;
  results:     Result[];
}


