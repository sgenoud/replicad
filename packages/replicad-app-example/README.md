# A sample app built with replicad!

This module is here to show how to integrate replicad in a React app with
react-three-fiber.

You can visit this page at <https://sample-app.replicad.xyz>

This is a basic integration that aims to show how the different pieces can
stick together:

- The replicad code can be just a javascript function
- It should live, with the opencascade loading in a webworker (ideally with
  functions exposed via comlink).
- Your main app can be just a react app (with react-three-fiber for instance)
- The `replicad-three-helper` helps you synchronise the data out of a meshed
  replicad shape to

This sample app uses vitejs, as a create react app setup does not play nice with
webassembly and webworkers. This allowed me to keep the code simple and nice.

## How to run locally

I do not advice to just clone the multirepo and then run from packages (it
needs some magic with the multi repo logic, this is not great).

What I would advice you do to is copy the sample app out of the multirepo and
then install and run. So something in that spirit:

```sh
git clone git@github.com:sgenoud/replicad.git
cp -r replicad/packages/replicad-app-example .
cd replicad-app-example
npm install
npm start
```
