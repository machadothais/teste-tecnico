import { Schema, model } from 'mongoose';

interface IImage {
  filename: string;
  description?: string;
}

const ImageSchema = new Schema<IImage>({
  filename: { type: String, required: true },
  description: { type: String },
});

const Image = model<IImage>('Image', ImageSchema);

export default Image;

