import * as React from 'react';
import { withApollo } from 'react-apollo';

interface Options {
    graphqlSaveMethod: string; // what graphql name will save title and content to db
    graphqlQuery: any;
}

interface State {
    title: string;
    content: string;
}

interface Props {
    client: {query: Function};
}

function withSaving(WrappedComponent, options: Options) {

    class WithSaving extends React.Component<Props, State> {

        displayName = `WithSaving(${WrappedComponent.displayName || WrappedComponent.name || 'Component'})`;

        constructor() {

            super();

            this.state = {
                title: '',
                content: ''
            };

            this.onSaveProgress = this.onSaveProgress.bind(this);
            this.saveToDB = this.saveToDB.bind(this);
            this.setState = this.setState.bind(this);
        }

        /**
         * Preload posts (used in @see components/*PostList)
         * Reason: Since updating cache in @see updateStoreAfterPost, graphql won't
         * bother asking server for posts since it assumes it has them all
         */
        async preloadPosts() {

            this.props.client.query({
                query: options.graphqlQuery
            });
        }

        onSaveProgress(e: any) {

            const newState = {};

            newState[e.target.name] = (e.target as HTMLInputElement).value;

            this.setState(newState);
        }

        saveToDB(e: any) {

            e.preventDefault();
            e.stopPropagation();

            this.preloadPosts();

            this.props[options.graphqlSaveMethod]({
                variables: {
                    title: this.state.title,
                    content: this.state.content
                },
                // store: apollo's cache, addTextPost: destructured return info from graphql
                update: (store, { data }) => {

                    this.updateStoreAfterPost(store, Object.values(data)[0]);
                }
            });
        }

        updateStoreAfterPost(store, newPost) {

            let storage;

            // gets the query resolver name (example: when getting a text post, the resolver is textPosts,
            // @see src/graphql/textPosts/index.tsx)
            const postQueryName = options.graphqlQuery.definitions[0].selectionSet.selections[0].name.value;

            try {
                storage = store.readQuery({query: options.graphqlQuery}); // if post type is already in the cache
            } catch (e) {
                storage = {};
                storage[postQueryName] = [];
            }

            storage[postQueryName].push(newPost);

            store.writeQuery({query: options.graphqlQuery, data: storage });
        }

        render() {

            const newProps = {
                progressSaver: {

                    onInput: this.onSaveProgress
                },
                dbSaver: this.saveToDB,
                setHocState: this.setState
            };

            return (
                <WrappedComponent {...this.props} {...newProps} />
            );
        }
    }

    return withApollo(WithSaving);
}

export default withSaving;