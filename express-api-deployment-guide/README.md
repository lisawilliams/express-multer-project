[![General Assembly Logo](https://camo.githubusercontent.com/1a91b05b8f4d44b5bbfb83abac2b0996d8e26c92/687474703a2f2f692e696d6775722e636f6d2f6b6538555354712e706e67)](https://generalassemb.ly/education/web-development-immersive)

# Express Deployment with Heroku

You've learned a lot about how to build a Node application over the last few
weeks. Now let's 'go public' and share our apps with the world!

## Prerequisites

- [Express Api](https://github.com/ga-wdi-boston/express-api)
-   This guide assumes you have followed [these installation instructions](https://github.com/ga-wdi-boston/express-api-template#installation) unequivocally.
- [Heroku Account and Toolbelt CLI](https://github.com/ga-wdi-boston/rails-heroku-setup-guide#getting-set-up)

## Objectives

-   Create a Heroku app from the command line.
-   Push the latest code to Heroku.
-   Migrate the production database.
-   Share a link to your app.


## Deploying to Heroku

Begin inside the root directory of your application (the directory you just renamed to <your-app> from `express-api-template`) deploy a new application
to Heroku:


-  [ ] Run `heroku create` in the command line in the root of you Express API to create a new (blank) app on Heroku.
-  [ ] commit to your local master branch
-  [ ] Push your latest code to Heroku (`git push heroku master`)
-  [ ] Add any addons `e.g. mlab to create a deployed database`
-  [ ] [mlab add on steps](https://github.com/ga-wdi-boston/express-api-deployment-guide#creating-mlab-addon)
-  [ ] in terminal, run : `git push heroku master`  (should build your site)
-  [ ] due to the first line of code in the `server.js` file, the default deployment environment will be `production`
-  [ ] in terminal, run :
        ```
        echo SECRET_KEY=$(/usr/local/opt/openssl/bin/openssl rand -base64 66 | tr -d '\n')
        ```
    this should generate a secret_key
-  [ ] in terminal run: `heroku config:set <copy and paste secret_key generated from last command>` .   should start with “SECRET_KEY and span about 40 randomized characters”
-  [ ] you need to set your client ORIGIN so that your deployed API will ONLY accept requests from the correct domain. IF you're client is deployed on Github, your ORIGIN will be:
      `https://<% github username %>.github.io`
-  [ ] Set your client ORIGIN by:
      `heroku config:set CLIENT_ORIGIN="https://<% github username %>.github.io"`
-  [ ] You should have three config variables set in heroku (`heroku>settings>config vars`): MONGODB_URI, SECRET_KEY, CLIENT_ORIGIN
-  [ ] Once all three of these are set, run in terminal: `heroku restart`
-  [ ] Then in terminal, run: `heroku open`

A full list of Heroku commands can be accessed by running `heroku --help`


### Share Your App **(REQUIRED)**

1. Open an issue on this repository [here](https://git.generalassemb.ly/ga-wdi-boston/express-api-deployment-guide/issues/new).

1. Include the deployed URL of your heroku app in the description.


## Creating Mlab addon

-  [ ] Run heroku addons:create with mongolab:sandbox `$ heroku addons:create mongolab:sandbox`

The first time you run the above command you'll see a message like this:

```
Creating mongolab:sandbox on ⬢ pacific-cliffs-91276... !
 ▸    Please verify your account to install this add-on plan (please enter a credit card) For more information, see
 ▸    https://devcenter.heroku.com/categories/billing Verify now at https://heroku.com/verify
```
-  [ ] You need to go to that URL, enter in your credit card information and then re-run the command again. This time you should see something like:

```
~/wdi/projects/group-project/TimeCapsule-Backend (master)$ heroku addons:create mongolab:sandbox
Creating mongolab:sandbox on ⬢ pacific-cliffs-91276... free
Welcome to mLab.  Your new subscription is being created and will be available shortly.  Please consult the mLab Add-on Admin UI to check on its progress.
Created mongolab-cubed-11237 as MONGODB_URI
Use heroku addons:docs mongolab to view documentation
```

Now you can log into your heroku dashboard, go to add-ons and click the mlab link.  This will bring you to your mlab database.

**If you already have an mLab account linked to your heroku account:**

If you already have an mLab account connected to your heroku account, you may see something more like this:

```sh
〉 heroku addons:create mongolab:sandbox
Creating mongolab:sandbox on ⬢ sleepy-dawn-72120... free
Welcome to mLab.  Your new subscription is being created and will be available shortly.  Please consult the mLab Add-on Admin UI to check on its progress.
Created mongolab-tetrahedral-59408 as MONGODB_URI
Use heroku addons:docs mongolab to view documentation
 ~/wdi-root/forge/wip/express-deploy-me  master
```

If you see this output, it worked, and you can resume the heroku deployment steps.

**[return to Deploying Heroku](https://github.com/ga-wdi-boston/express-api-deployment-guide#deploying-to-heroku)**


## WARNING: Ephemeral Filesystem.

One serious limitation of Heroku is that it provides an 'ephemeral filesystem';
in other words, if you try to save a new file inside the repo (e.g. an uploaded
image file), it will disappear when your app is restarted or redeployed.

As an example, try running the following commands:

```sh
heroku run bash
touch happy.txt; echo 'is happy' > happy.txt
cat happy.txt
```

Then, hit Ctrl-D to get out of heroku bash shell. If you re-open the shell and
run `ls -l`, `happy.txt` will be missing!

The typical workaround is to save files in cloud storage such as [Amazon
S3](https://aws.amazon.com/s3/).

## Troubleshooting

-  **First step upon encountering an issue should be to run `heroku logs` to read the logs of your deployed heroku server**
-  [Heroku Addons](https://devcenter.heroku.com/articles/managing-add-ons) and [mLab MongoDB](https://elements.heroku.com/addons/mongolab)
- [Previous Issues](https://github.com/ga-wdi-boston/group-project/issues?utf8=%E2%9C%93&q=is%3Aissue%20deploy%2C%20heroku)



## Additional Resources

-   [Heroku Command Line](https://devcenter.heroku.com/categories/command-line)

## [License](LICENSE)

1.  All content is licensed under a CC­BY­NC­SA 4.0 license.
1.  All software code is licensed under GNU GPLv3. For commercial use or
    alternative licensing, please contact legal@ga.co.
