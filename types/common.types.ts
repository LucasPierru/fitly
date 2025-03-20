import { Types } from 'mongoose';

export type DefaultProperties = {
  _id: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
};

export type Day =
  | 'monday'
  | 'tuesday'
  | 'wednesday'
  | 'thursday'
  | 'friday'
  | 'saturday'
  | 'sunday';
