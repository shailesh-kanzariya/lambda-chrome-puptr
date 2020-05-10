const chromeLambda = require("chrome-aws-lambda"); // lambda-layer has this module
const S3Client = require("aws-sdk/clients/s3");

const s3 = new S3Client({ region: process.env.S3_REGION });

// function to take screenshot of the passed in web-url and upload it on AWS S3
exports.handler = async event => {
  // browser instance with configs
  const browser = await chromeLambda.puppeteer.launch({
    args: chromeLambda.args,
    executablePath: await chromeLambda.executablePath,
    defaultViewport: chromeLambda.defaultViewport
  });
  // create new tab
  const page = await browser.newPage();
  // navigate to url
  await page.goto(event.url);
  // take screenshot
  const buffer = await page.screenshot()

  // upload taken screenshot to AWS S3 and make it publicly accessible
  const result = await s3
    .upload({
      Bucket: process.env.S3_BUCKET,
      Key: `scrnshot-${Date.now()}.png`,
      Body: buffer,
      ContentType: "image/png",
      ACL: "public-read"
    })
    .promise();
    return { url: result.Location }; // return AWS S3 URL of the uploaded screenshot
}