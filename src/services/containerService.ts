import docker from '../services/dockerService';

export const createImage = async (dockerfilePath: string, imageName: string) => {
  try {
    const stream = await docker.buildImage(dockerfilePath, { t: imageName });
    return new Promise((resolve, reject) => {
      stream.pipe(process.stdout, { end: true });
      stream.on('end', () => resolve(`Image ${imageName} built successfully`));
      stream.on('error', (err) => reject(err));
    });
  } catch (error) {
    throw new Error(`Failed to build image: ${error.message}`);
  }
};

export const runContainer = async (imageName: string, containerName: string) => {
  try {
    const container = await docker.createContainer({
      Image: imageName,
      name: containerName,
      Tty: true,
    });
    await container.start();
    return `Container ${containerName} started successfully`;
  } catch (error) {
    throw new Error(`Failed to start container: ${error.message}`);
  }
};
