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

/**
 * Converts a Base64 string to a Blob.
 */
export const base64ToBlob = (base64: string, mimeType: string): Blob => {
  const byteCharacters = atob(base64);
  const byteNumbers = new Array(byteCharacters.length);
  for (let i = 0; i < byteCharacters.length; i++) {
    byteNumbers[i] = byteCharacters.charCodeAt(i);
  }
  const byteArray = new Uint8Array(byteNumbers);
  return new Blob([byteArray], { type: mimeType });
};

/**
 * Converts a Base64 string of raw PCM data to a WAV Blob.
 * Default sample rate for Gemini TTS is 24000Hz.
 */
export const base64ToWavBlob = (base64: string, sampleRate = 24000): Blob => {
  const binaryString = atob(base64);
  const len = binaryString.length;
  const buffer = new Uint8Array(len);
  for (let i = 0; i < len; i++) {
    buffer[i] = binaryString.charCodeAt(i);
  }

  const wavHeader = createWavHeader(len, sampleRate);
  const wavBlob = new Blob([wavHeader, buffer], { type: 'audio/wav' });
  return wavBlob;
};

/**
 * Creates a standard RIFF/WAVE header.
 */
function createWavHeader(dataLength: number, sampleRate: number) {
  const numChannels = 1; // Gemini TTS is mono
  const bitsPerSample = 16; // Gemini TTS is 16-bit PCM
  const blockAlign = (numChannels * bitsPerSample) / 8;
  const byteRate = sampleRate * blockAlign;
  const headerLength = 44;
  const buffer = new ArrayBuffer(headerLength);
  const view = new DataView(buffer);

  // RIFF identifier
  writeString(view, 0, 'RIFF');
  // file length
  view.setUint32(4, 36 + dataLength, true);
  // RIFF type
  writeString(view, 8, 'WAVE');
  // format chunk identifier
  writeString(view, 12, 'fmt ');
  // format chunk length
  view.setUint32(16, 16, true);
  // sample format (1 is PCM)
  view.setUint16(20, 1, true);
  // channel count
  view.setUint16(22, numChannels, true);
  // sample rate
  view.setUint32(24, sampleRate, true);
  // byte rate (sample rate * block align)
  view.setUint32(28, byteRate, true);
  // block align (channel count * bytes per sample)
  view.setUint16(32, blockAlign, true);
  // bits per sample
  view.setUint16(34, bitsPerSample, true);
  // data chunk identifier
  writeString(view, 36, 'data');
  // data chunk length
  view.setUint32(40, dataLength, true);

  return buffer;
}

function writeString(view: DataView, offset: number, string: string) {
  for (let i = 0; i < string.length; i++) {
    view.setUint8(offset + i, string.charCodeAt(i));
  }
}