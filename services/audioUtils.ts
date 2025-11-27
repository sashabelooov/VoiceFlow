/**
 * Converts a File object to a Base64 string suitable for the Gemini API.
 */
export const fileToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      const result = reader.result as string;
      // Remove the Data URL prefix (e.g., "data:audio/mp3;base64,")
      const base64Data = result.split(',')[1];
      resolve(base64Data);
    };
    reader.onerror = (error) => reject(error);
  });
};

/**
 * Gets the duration of an audio file in seconds using the browser's Audio API.
 */
export const getAudioDuration = (file: File): Promise<number> => {
  return new Promise((resolve, reject) => {
    const audio = new Audio();
    const objectUrl = URL.createObjectURL(file);
    
    audio.src = objectUrl;
    
    audio.onloadedmetadata = () => {
      // Duration in seconds
      const duration = audio.duration;
      URL.revokeObjectURL(objectUrl);
      
      if (duration === Infinity || isNaN(duration)) {
        // Fallback for some streaming formats or incomplete metadata
        resolve(0); 
      } else {
        resolve(duration);
      }
    };

    audio.onerror = () => {
      URL.revokeObjectURL(objectUrl);
      reject(new Error("Could not load audio file metadata."));
    };
  });
};

/**
 * Formats seconds into MM:SS format.
 */
export const formatDuration = (seconds: number): string => {
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m}m ${s}s`;
};
