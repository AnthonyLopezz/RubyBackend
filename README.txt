Libraries

npm i express
npm i express --save
npm i --save-dev @types/express

npm i cors -S
npm i dotenv -S
npm i multer -S
npm i dotenv env-var
npm install mongoose
npm i bcryptjs

npm i -D typescript @types/node ts-node-dev rimraf

npx tsc --init --outDir dist/ --rootDir src

"dev": "tsnd --respawn --clear src/app.ts",
"build": "rimraf ./dist && tsc",
"start": "npm run build && node dist/app.ts"


You have to install Docker Desktop and Mongo Compass.

docker compose up -d



Anthony López