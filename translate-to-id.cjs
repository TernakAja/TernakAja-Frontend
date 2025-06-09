const fs = require("fs");
const axios = require("axios");
const path = require("path");
require("dotenv").config();

const apiKey = process.env.TRANSLATOR_KEY;
const region = process.env.TRANSLATOR_REGION;
const endpoint = process.env.TRANSLATOR_ENDPOINT;

// Cek ENV
if (!apiKey || !region || !endpoint) {
  console.error("❌ Missing TRANSLATOR_KEY, TRANSLATOR_REGION, or TRANSLATOR_ENDPOINT");
  process.exit(1);
}

// Load JSON
const rawJson = JSON.parse(fs.readFileSync("./src/locales/en/translation.json", "utf8"));

// === Helper untuk flatten ===
function flatten(obj, prefix = "", result = {}) {
  for (const key in obj) {
    const value = obj[key];
    const newKey = prefix ? `${prefix}.${key}` : key;

    if (typeof value === "object" && value !== null) {
      flatten(value, newKey, result);
    } else {
      result[newKey] = value;
    }
  }
  return result;
}

// === Helper untuk unflatten ===
function unflatten(flat) {
  const result = {};
  for (const flatKey in flat) {
    const keys = flatKey.split(".");
    keys.reduce((acc, key, idx) => {
      if (idx === keys.length - 1) {
        acc[key] = flat[flatKey];
      } else {
        if (!acc[key]) acc[key] = {};
      }
      return acc[key];
    }, result);
  }
  return result;
}

// === Translate batch ===
async function translateBatch(texts) {
  try {
    const response = await axios({
      method: "POST",
      baseURL: endpoint,
      url: "/translate?api-version=3.0&from=en&to=id",
      headers: {
        "Ocp-Apim-Subscription-Key": apiKey,
        "Ocp-Apim-Subscription-Region": region,
        "Content-Type": "application/json"
      },
      data: texts.map(text => ({ Text: text }))
    });

    return response.data.map(item => item.translations[0].text);
  } catch (error) {
    console.error("❌ Translation error:", error.response?.data || error.message);
    return texts; // fallback
  }
}

// === Main Process ===
(async () => {
  const flatJson = flatten(rawJson);
  const keys = Object.keys(flatJson);
  const values = Object.values(flatJson);
  const translatedFlat = {};

  for (let i = 0; i < values.length; i += 25) {
    const batchKeys = keys.slice(i, i + 25);
    const batchValues = values.slice(i, i + 25);

    const translated = await translateBatch(batchValues);

    batchKeys.forEach((key, idx) => {
      translatedFlat[key] = translated[idx];
    });
  }

  const finalJson = unflatten(translatedFlat);

  // Simpan hasil ke translation.json versi id
  const outputDir = "./src/locales/id";
  fs.mkdirSync(outputDir, { recursive: true });
  fs.writeFileSync(
    path.join(outputDir, "translation.json"),
    JSON.stringify(finalJson, null, 2),
    "utf8"
  );

  console.log("✅ Terjemahan selesai. File tersimpan di ./src/locales/id/translation.json");
})();
