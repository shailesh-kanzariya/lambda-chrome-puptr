# lambda-chrome-puptr
**lambda-chrome-puptr** has everything to deploy and run [Puppeteer](https://pptr.dev/) with **Headless Chrome** in **AWS Lambda** using [chrome-aws-lambda](https://github.com/alixaxel/chrome-aws-lambda) as [chrome-aws-lambda-layer](https://github.com/shelfio/chrome-aws-lambda-layer).
# Why **lambda-chrome-puptr**?
There are many examples that use "chrome for lambda" as packaged binary into "lambda package" or use "chrome for lambda" binary from AWS S3 bucket. And many might have earlier used [puppeteer-lambda-starter-kit](https://github.com/sambaiz/puppeteer-lambda-starter-kit) where someone has to ensure to maintain compatibility across all used frameworks/packages and binaries to make it work.

Similarly, I also frequently faced challanges to maintain compatible versions of **chrome for lambda**, **Puppeteer**, **Node.js** and **lambda runtime** together. Thanks to [shelfio](https://github.com/shelfio/chrome-aws-lambda-layer) to publish solid lambda layer containing **chrome for lambda** and **Puppeteer** and keeping it up-to-date and compatible with latest versions. And this lambda layer inspired to develop read-to-use and extensible **lambda-chrome-puptr**.
# How to use **lambda-chrome-puptr**?
High level steps:
- Clone this repo
- Run `npm install`
- Ensure to modify AWS S3 bucket name for `scrnshotsBucket` to your bucket name in `serverless.yml`
- Verify AWS region in `serverless.yml` where you want deploy
- Run `sls deploy --aws-profile` *your-aws-profile-name*
- This should have deployed AWS Lambda and have attached Lambda Layer with it
- Now to test lambda, enter `{ "url": "https://www.apple.com/" }` as lambda input where `url` contains website-name of which the screenshot to be captured and uploaded to S3
- On succsessful lambda run, it returns publicly accessible **screeshot-url**
- Please Note: This code, for demostration purpose, makes AWS S3 bucket publicly accessible. Please modify it as per your requirements.



