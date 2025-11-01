const { GoogleGenAI } = require("@google/genai");

const ai = new GoogleGenAI(process.env.GEMINI_API_KEY);

const captiongenerator = async (base64ImageFile) => {
    const contents = [
        {
            inlineData: {
                mimeType: "image/jpeg",
                data: base64ImageFile,
            },
        },
        { text: "Caption this image." },
    ];

    const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: contents,
        config: {
            systemInstruction: "generate single caption maximum of 15 words, i am going to use it on social media ,generate it with hashtags and emojis."
        }
    });
    return response.text
}

module.exports = captiongenerator;