var express = require('express');
var { graphqlHTTP } = require('express-graphql');
var { graphql, buildSchema } = require('graphql');

const PORT = 4000;

//SCHEMA - DEFINE THE RESPONSE'S TYPE & ENDPOINTS
//Construct a schema using the GraphQL Schema Language
//Define the
var schema = buildSchema(`
    type Query {
        hello: Int
    }
`);

//RESOLVER - DEFINE WHAT INFORMATION IS RETURNED
//Root provides resolver function for each API endpoint
var root = { hello: () => {
    //business logic can go here
    let potato = 5;
    return potato * 72;
}}

//Runs the graphql querry 'hello' and prints out the response
//graphql, schema, query, resolver -> promise -> 
graphql( schema, '{ hello }', root ).then( response => {
    console.log(response);
    console.log("GraphQL says: ", response);
})


var app = express();
app.use('/graphiql', graphqlHTTP({
    schema,
    rootValue: root,
    graphiql: true,
}));

app.listen(PORT);
console.log( `Running a graph QL server @ http://localhost:${PORT}/graphiql` );