Need the following dependencies: 

npm install react-icons --save

npm install mongodb
    npm install prisma --save-dev
    npx prisma init --datasource-provider [your database manager in this case is mongodb]

The next step is insert the pirsma link inside the .env file generateb by prisma
    saul:password insert the password
    net/[insert the model name]?retryWrites

    Then we need to type:
    npx prisma generate
Then: 
