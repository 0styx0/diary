import * as React from 'react';

interface Options {
    graphqlSaveMethod: string; // what graphql name will save title and content to db
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

            this.props[options.graphqlSaveMethod]({variables: {
                title: this.state.title,
                content: this.state.content
            }});
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