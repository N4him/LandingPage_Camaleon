import admin from 'firebase-admin';


const serviceAccount = {
  "type": "service_account",
  "project_id": "database-camaleon",
  "private_key_id": "80e8611ebaea861f1aa2cba7d07dde2e063b95e8",
  "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQCq/09HU+7eWa8s\nyYpLOmzJgWEmAnHKx6QeQFoMxMNlYjcrornCDheGHygGyvnuG6xvjqFc8+BW/szq\nlMcuEiiFCetPIfyN5SmKkdxOV0qioQA9sS9KaQ4JybDkrUorcmLLqy8cQSJvkLZW\npovvxSgx7xsGedjkfbrePb3JdeNFef6bw6+hcm9oiI0c8yoEyo0ufmzGi+D6Ll0/\nOuEsoXFhzhzYu50k7LaWWFpt5yCqUu6ZDFze9nehXavS8/vlWocS02zdBQs1ql2f\nXTz9umPTJJjsY4wV3OxPGQ90LYV5wnZm9W4FpU+6lvCGWymSByptU1nsG49FbLEx\nGEmVJ5WJAgMBAAECggEACCkB6AX93reJ8Am4I0no+h7F+5HfS02Gq/jnMzfKmVJ8\nDoWH9tZEUh63gsd58N56NqKoWa67tHsZXVJ3ROAR9fNYuuCE1GKsvlOin0x0H9mu\nEMOdXaAwzs/EtMz+Pp+JTm3fZCpJkehmgzEUeX8/oU5nTEJRUuobGlL49R2+mEib\noBg7yz0uisUYkaWw8vLb5lZYNplnXPDlLt9airXWQC1NF9FIgkf8NtGEg9algRY8\nfy77fAA0H8W9iWXcV4iycZyR0qti5CqGaFktgXoTRcpdP3gxwU4JUGnfSSyywPKx\naA1O52QgRXKnAXuB7fCb1pWMsHQ2Q7J3cj9JPA9ClwKBgQDVviijSHM7czademeC\nYdi1O78PvoFfbvubVbIoTgfvzo0tg/zf3KfvL4sPhyIqbs0bUjIO3uKx1ic5XCU3\nO8JiXbCr2RJk+sozZBYRLDPDjNYSuFf4y6Px7yNK1NYS0gE4L6wLRa7pdRM0iyx3\n6/4yGAICf00jDfu+3f58Fv/GBwKBgQDMzbzICtPreuU0nk8In2ZVvhhVyrjw62Wp\nK5ZwljWQoqNXxIcNNTzr18h6D7lu6Gu09MuZGmtDz4/jiOfrOX3Jve8b76v2hmSu\nb9zQK2+6MUzC3wDLCG25OQXgh+64jA0szUR6Y7XDFqi8gJAwm/a8EpMW124P5GGB\nWQ6hjK9j7wKBgQCa4zDJmh++ze+e0GufxM3oDwKWIyPXBzKWztPKdzkzIseVWxbt\nFhYvspEf0HoGq8I/8SFLO2KlIh3MaCSj0M88vs3eye+Vc1MBSJ7hFNnx8+XRLPq6\n1L7Z+8PkXzU98CZoE8ulY3qrvGYNZmj0AfRzUohqTNuV8nUiS/Y07+mrEwKBgF1F\nqZ9VRxRsgOyI2KetqLaN/5k63SVjn4X/AuG9lyGK4Gc9auA6CcfDG1tzw9jd4wej\noQHWRVm5sudGV5EKOt5hMP+BFMkOhdXnviHUVmruvu3VEBBng0kizilm3vKPXgS0\na2Zt+L6jmC9ZQdHRhfo7X1+8tzRnp3x4KbCrWMljAoGADhFopbfk6bk2V2Husdj/\nR099il+R1JpLjVD6H4jD5DckOPGWojAfZaUR+9oSGRg2lAat4RCrlzepWB7tqg2D\nQDUFnP3PG5JOO9HDIg9OiWS8nfk3sl3eM4FvPnfRQAdyF2J9lji+PKTfVj1RFVRB\nvOtR+qS5Bu9SE/EKos5D7aE=\n-----END PRIVATE KEY-----\n",
  "client_email": "firebase-adminsdk-j1oz2@database-camaleon.iam.gserviceaccount.com",
  "client_id": "108530508725906841519",
  "auth_uri": "https://accounts.google.com/o/oauth2/auth",
  "token_uri": "https://oauth2.googleapis.com/token",
  "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
  "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-j1oz2%40database-camaleon.iam.gserviceaccount.com",   

  "universe_domain": "googleapis.com"
};

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)   

});

export default admin;
