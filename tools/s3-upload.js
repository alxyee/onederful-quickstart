const s3 = require('s3');
const path = require('path');
const build = require('./build');
const task = require('./task');
const config = require('./config');

module.exports = task('upload', () => Promise.resolve()
  .then(() => Uploader)
);
const Uploader = new Promise((resolve, reject) => {
  const client = s3.createClient({
  s3Options: {
      accessKeyId: 'YOUR_AWS_ACCESS_KEY',
      secretAccessKey: 'YOUR_AWS_SECRET_KEY',
      region: 'us-west-2',
      sslEnabled: true,
    },
  });
  const uploader = client.uploadDir({
    localDir: 'public/',
    deleteRemoved: true,
    s3Params: {
      Bucket: 'YOUR_BUCKET_NAME'
    },
  });
  uploader.on('error', reject);
  uploader.on('end', resolve);
});
