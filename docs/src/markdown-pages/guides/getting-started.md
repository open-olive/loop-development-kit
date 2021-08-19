---
slug: 'guides/getting-started'
title: 'Getting Started'
description: 'How to get moving running and developing your first loop.'
---

# Getting Started

1. Download Olive Helps from the root page of [the Developer Hub](https://open-olive.github.io/olive-helps/).
1. Install and boot up Olive Helps.
1. Create an Olive account, and log in.
1. Open the Olive Helps drawer and open the App Menu in the top right.
1. Go to the Loop Library.
1. Click the link to **Become a Loop Author**.
1. Click the button to **Make me a Loop Author!**.
1. Agree to the Terms and Conditions.

And congrats! You've officially signed up to become a Loop author. The next thing you'll want to do is to install a Loop locally. Some examples have been included in the LDK for you to use.

1. Download the LDK from [our Github](https://github.com/open-olive/loop-development-kit). Alternatively, you could copy one of the example Loop directories
    - These are located within the LDK at `ldk/javascript/examples`
1. Build your local Loop. See [these instructions](https://github.com/open-olive/loop-development-kit/tree/main/ldk/javascript#producing-loop-compilations) for more information. If you use VSCode, see the [section below](/guides/getting-started#vscode-extension) for information about the LDK VSCode Extension.
1. Run Olive Helps, and then go to the **Loop Library**
1. Click on **Local Loops**
1. Click **Install Local Loop**
1. Select the directory that your compiled code has been output to. If you're using the default configuration, that location will be `$PROJECT_LOCATION/dist`.
1. Configure the information about your local Loop, and click **Install Local Loop**. If everything goes well, you will get a notification that it succeeded.
    - For example, if your local Loop is in the directory `dist/loop.js` you would select `dist`
1. Test out the Loop, and then make some changes.


# VSCode Extension
If you use VSCode, you can use the [LDK VSCode Extension](https://marketplace.visualstudio.com/items?itemName=Olive-AI.vscode-loop-development-kit) to generate a skeleton project for your Loop development. The extension can be used to generate either a Typescript or ES6 Javascript Loop.