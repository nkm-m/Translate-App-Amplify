const AWS = require("aws-sdk");
AWS.config.update({ region: "ap-northeast-1" });
AWS.config.apiVersions = {
  translate: "2017-07-01",
};
const translate = new AWS.Translate();
exports.handler = async (event) => {
  let translatedText = "";
  try {
    //Amazon Translate: Japanese to English
    const params = {
      SourceLanguageCode: "ja" /* required */,
      TargetLanguageCode: "en" /* required */,
      Text: JSON.parse(event.body),
    };
    translatedText = await translate.translateText(params).promise();
  } catch (error) {
    console.log(error);
  }

  //toLowerCase
  translatedText = translatedText.TranslatedText.toLowerCase();
  console.log(translatedText);
  //replace
  translatedText = translatedText.replace(/'|,|\.|\?/g, "").replace(/ /g, "-");
  console.log(translatedText);

  return {
    statusCode: 200,
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "OPTIONS,POST",
    },
    body: JSON.stringify(translatedText),
  };
};
