import * as React from 'react';
import { withApollo } from 'react-apollo';
import Graphql from '../../helpers/graphql';

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

                    Graphql.updateStore(store, options.graphqlQuery, Object.values(data)[0]);
                }
            });
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