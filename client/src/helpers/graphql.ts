
class Graphql {

    static removeFromStore(store, idToRemove, graphqlQuery) {

        const postQueryName = graphqlQuery.definitions[0].selectionSet.selections[0].name.value;

        const data = store.readQuery({query: graphqlQuery }); // the GraphQL query is returned by the function fooQuery

        const updatedData = data[postQueryName].filter(elt => elt.id !== idToRemove);
        data[postQueryName] = updatedData;

        store.writeQuery({ query: graphqlQuery, data });
    }

    /**
     * @param store - apollo's store
     * @param graphqlQuery - a query of the type that should be updated
     * @param newInfo - what should be added to the cache
     *
     */
    static updateStore(store, graphqlQuery, newPost) {

        let storage;

        // gets the query resolver name (example: when getting a text post, the resolver is textPosts,
        // @see src/graphql/textPosts/index.tsx)
        const postQueryName = graphqlQuery.definitions[0].selectionSet.selections[0].name.value;

        try {
            storage = store.readQuery({query: graphqlQuery}); // if post type is already in the cache
        } catch (e) {
            storage = {};
            storage[postQueryName] = [];
        }

        storage[postQueryName].push(newPost);

        store.writeQuery({query: graphqlQuery, data: storage });
    }
}

export default Graphql;