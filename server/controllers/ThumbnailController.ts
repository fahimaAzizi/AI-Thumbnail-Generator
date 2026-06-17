import { Request, Response } from 'express';
import Thumbnail from '../modules/Thumbnail.ts';
import { GenerateContentConfig, HarmBlockThreshold, HarmCategory } from '@google/genai';
import path from 'node:path';
import fs from 'fs';
import { getModel } from '../configs/ai.ts';
import { fileURLToPath } from 'url';
import cloudinary from 'cloudinary';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

const model = getModel();

const stylePrompts = {
  'Bold & Graphic':
    'eye-catching thumbnail, bold typography, vibrant colors, expressive facial reaction, dramatic lighting, high contrast, click-worthy composition, professional style',

  'Tech/Futuristic':
    'futuristic thumbnail, sleek modern design, digital UI elements, glowing accents, holographic effects, cyber-tech aesthetic, sharp lighting, high-tech atmosphere',

  'Minimalist':
    'minimalist thumbnail, clean layout, simple shapes, limited color palette, plenty of negative space, modern flat design, clear focal point',

  'Photorealistic':
    'photorealistic thumbnail, ultra-realistic lighting, natural skin tones, candid moment, DSLR-style photography, lifestyle realism, shallow depth of field',

  'Illustrated':
    'illustrated thumbnail, custom digital illustration, stylized characters, bold outlines, vibrant colors, creative cartoon or vector art style'
};

const colorSchemeDescriptions = {
  warm: 'warm tones like red, orange, and yellow',
  cool: 'cool tones like blue, cyan, and purple',
  dark: 'dark cinematic tones',
  pastel: 'soft pastel tones'
};

export const generateThumbnail = async (req: Request, res: Response) => {
  try {
    const { userId } = req.session;

    const {
      title,
      prompt: user_prompt,
      style,
      aspect_ratio,
      color_scheme,
      text_overlay
    } = req.body;

    const thumbnail = await Thumbnail.create({
      userId,
      title,
      prompt_used: user_prompt,
      user_prompt,
      style,
      aspect_ratio,
      color_scheme,
      text_overlay,
      isGenerating: true
    });

    const model = 'gemini-image-preview';

    const generationConfig: GenerateContentConfig = {
      maxOutputTokens: 32768,
      temperature: 1,
      topP: 0.95,
      responseModalities: ['IMAGE'],
      imageConfig: {
        aspectRatio: aspect_ratio || '16:9',
        imageSize: '1K'
      },
      safetySettings: [
        { category: HarmCategory.HARM_CATEGORY_HATE_SPEECH, threshold: HarmBlockThreshold.OFF },
        { category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT, threshold: HarmBlockThreshold.OFF },
        { category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT, threshold: HarmBlockThreshold.OFF },
        { category: HarmCategory.HARM_CATEGORY_HARASSMENT, threshold: HarmBlockThreshold.OFF }
      ]
    };

    let prompt = `Create a ${stylePrompts[style as keyof typeof stylePrompts]}
for: "${title}"`;

    if (color_scheme) {
      prompt += ` Use a ${colorSchemeDescriptions[color_scheme as keyof typeof colorSchemeDescriptions]} color scheme.`;
    }

    if (user_prompt) {
      prompt += ` Additional details: ${user_prompt}.`;
    }

    prompt += ` The thumbnail should be ${aspect_ratio}, visually stunning, and designed to maximize click-through rate.`;

    const response: any = await (model as any).generateContent({
      model,
      contents: [prompt],
      config: generationConfig
    });

    const parts = response?.candidates?.[0]?.content?.parts;
    if (!parts) throw new Error('Unexpected response from AI');

    let finalBuffer: Buffer | null = null;

    for (const part of parts) {
      if (part.inlineData?.data) {
        finalBuffer = Buffer.from(part.inlineData.data, 'base64');
      }
    }

    if (!finalBuffer) {
      throw new Error('No image generated');
    }

    const filename = `thumbnail-${Date.now()}.png`;
    const filePath = path.join(__dirname, '..', 'images', filename);

    fs.mkdirSync(path.dirname(filePath), { recursive: true });
    fs.writeFileSync(filePath, finalBuffer);
    const uploadResult = await cloudinary.v2.uploader.upload(
  filePath,
  { resource_type: 'image' }
)

thumbnail.image_url = uploadResult.url;
thumbnail.isGenerating = false;

await thumbnail.save();

res.json({
  message: 'Thumbnail Generated',
  thumbnail
});

// remove image file from disk
fs.unlinkSync(filePath);

} catch (error: any) {
  console.log(error);

  res.status(500).json({
    message: error.message
  });
}
  
}