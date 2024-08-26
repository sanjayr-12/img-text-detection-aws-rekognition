import {
  RekognitionClient,
  DetectTextCommand,
} from "@aws-sdk/client-rekognition";


const client = new RekognitionClient({});


export const Reko = async (params) => {
  try {
      const command = new DetectTextCommand(
          {
              Image: {
                  Bytes:params
              }
        }
    );
    const response = await client.send(command);
    return response
  } catch (error) {
    console.log(error.message);
  }
};