const chromeLambda = require("chrome-aws-lambda");
const S3Client = require("aws-sdk/clients/s3");

const s3 = new S3Client({ region: process.env.S3_REGION });

exports.handler = async event => {
  const browser = await chromeLambda.puppeteer.launch({
    args: chromeLambda.args,
    executablePath: await chromeLambda.executablePath,
    defaultViewport: chromeLambda.defaultViewport
  });

  const page = await browser.newPage();
  await page.goto(event.url);
  const buffer = await page.screenshot()

  const result = await s3
    .upload({
      Bucket: process.env.S3_BUCKET,
      Key: `scrnshot-${Date.now()}.png`,
      Body: buffer,
      ContentType: "image/png",
      ACL: "public-read"
    })
    .promise();
    return { url: result.Location };
}