# BaNetOn

## Get started

Install nodeJs. This command should work:

```
sudo apt-get install curl software-properties-common
curl -sL https://deb.nodesource.com/setup_12.x | sudo bash -
sudo apt-get install nodejs
```

Install the dependencies:

```
cd bayesian-network
npm i
```

Install pm2:

```
npm install pm2 -g
```

Start server on pm2:
```
pm2 start server.js
```


## Dev

```
nodemon
```
