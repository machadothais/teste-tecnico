import { Request, Response } from 'express';
import { createImage, runContainer } from '../services/containerService';
import Image from '../models/img';
import path from 'path';

export const uploadImage = async (req: Request, res: Response) => {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }
  
    try {
      const image = new Image({
        filename: req.file.filename,
        description: req.body.description,
      });
  
      await image.save();
      res.json({ message: 'File uploaded successfully', image });
    } catch (error) {
      res.status(500).json({ message: 'Error uploading image', error });
    }
  };
  
  export const getImage = async (req: Request, res: Response) => {
    try {
      const image = await Image.findOne({ filename: req.params.filename });
  
      if (!image) {
        return res.status(404).json({ message: 'Image not found' });
      }
  
      res.json(image);
    } catch (error) {
      res.status(500).json({ message: 'Error retrieving image', error });
    }
};

export const buildImage = async (req: Request, res: Response) => {
  const { imageName } = req.body;
  const dockerfilePath = path.join(__dirname, '..', 'docker', 'Dockerfile');

  try {
    const result = await createImage(dockerfilePath, imageName);
    res.json({ message: result });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const startContainer = async (req: Request, res: Response) => {
  const { imageName, containerName } = req.body;

  try {
    const result = await runContainer(imageName, containerName);
    res.json({ message: result });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

