import resize, { initResize } from "@jsquash/resize";
import { MimeType, type Transformer } from "remix-image";
import {
  AvifHandler,
  WebpHandler,
  type ImageHandler,
  JpegHandler,
  PngHandler,
} from "./handlers";

const typeHandlers: Record<string, ImageHandler> = {
  [MimeType.JPEG]: JpegHandler,
  [MimeType.PNG]: PngHandler,
  [MimeType.AVIF]: AvifHandler,
  [MimeType.WEBP]: WebpHandler,
};

const supported = new Set([
  MimeType.JPEG,
  MimeType.PNG,
  MimeType.WEBP,
  MimeType.AVIF,
]);

export const wasmTransformer: Transformer = {
  name: "wasmTransformer",
  supportedInputs: supported,
  supportedOutputs: supported,
  transform: async (
    { data, contentType: inputContentType },
    {
      contentType: outputContentType,
      width,
      height,
      fit,
      position,
      background,
      quality,
      compressionLevel,
      loop,
      delay,
    }
  ) => {
    try {
      console.log("before initResize");
      await initResize(RESIZE_ENC_WASM);
      console.log("after initResize");
      console.log(inputContentType, typeHandlers);
      const inputHandler = typeHandlers[inputContentType];
      const rgba = await inputHandler.decode(data);

      let targetWidth = width || rgba.width * ((height || 0) / rgba.height);
      let targetHeight = height || rgba.height * ((width || 0) / rgba.width);

      console.log(targetWidth, targetHeight);

      if (targetWidth <= 0 || targetHeight <= 0) {
        throw new Error("At least one dimension must be provided!");
      }

      targetWidth = Math.round(targetWidth);
      targetHeight = Math.round(targetHeight);

      console.log("before resize");
      const resizedImageData = await resize(
        {
          width: rgba.width,
          height: rgba.height,
          data: new Uint8ClampedArray(rgba.data),
        },
        {
          width: targetWidth,
          height: targetHeight,
        }
      );
      console.log(
        "after resize",
        outputContentType || inputContentType,
        typeHandlers
      );

      const outputHandler = typeHandlers[outputContentType || inputContentType];
      console.log(
        "before encode",
        outputHandler,
        outputContentType || inputContentType
      );
      const result = await outputHandler.encode(
        {
          width: resizedImageData.width,
          height: resizedImageData.height,
          data: resizedImageData.data,
        },
        {
          width: targetWidth,
          height: targetHeight,
          fit,
          position,
          background,
          quality,
          compressionLevel,
          loop,
          delay,
        }
      );
      console.log("after encode");
      return new Uint8Array(result);
    } catch (e) {
      console.error(12345);
      console.error(e);
      throw e;
    }
  },
};
