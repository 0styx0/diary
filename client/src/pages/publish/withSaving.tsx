import * as React from 'react';

interface Options {
    graphqlSaveMethod: string; // what graphql name will save title and content to db
    graphqlQuery: Function;
    postType?: any;
}

interface State {
    title: string;
    content: string;
}

function withSaving(WrappedComponent, options: Options) {

    class WithSaving extends React.Component<{}, State> {

        displayName = `WithSaving(${WrappedComponent.displayName || WrappedComponent.name || 'Component'})`;

        constructor() {

            super()

            this.state = {
                title: '',
                content: ''
            }

            this.onSaveProgress = this.onSaveProgress.bind(this)
            this.saveToDB = this.saveToDB.bind(this)
        }

        onSaveProgress(e: any) {

            const newState = {};

            newState[e.target.name] = (e.target as HTMLInputElement).value;

            this.setState(newState);
        }

        saveToDB(e: any) {

            e.preventDefault();
            e.stopPropagation();

            this.props[options.graphqlSaveMethod]({
                variables: {
                    title: this.state.title,
                    content: this.state.content
                },
                // store: apollo's cache, addTextPost: destructured return info from graphql
                update: (store, { data }) => {

                    this.updateStoreAfterPost(store, data[options.graphqlSaveMethod]);
                }
            });

        }

        updateStoreAfterPost(store, newPost) {

            let storage;

            try {
                storage = store.readQuery({query: options.graphqlQuery});
            } catch (e) {
                storage = {};
                storage[newPost.__typename] = []
            }

            // gets the query resolver name (example: when getting a text post, the resolver is textPosts,
            // @see src/graphql/textPosts/index.tsx)
            const postQueryName = options.postType.definitions[0].selectionSet.selections[0].name.value

            storage[postQueryName].push(newPost);

             store.writeQuery({query: options.graphqlQuery, data: storage });
        }

        render() {

            const newProps = {
                progressSaver: {

                    onInput: this.onSaveProgress
                },
                dbSaver: this.saveToDB
            }

            return (
                <WrappedComponent {...this.props} {...newProps} />
            );
        }
    }

    return WithSaving;
}

export default withSaving;