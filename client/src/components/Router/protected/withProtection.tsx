import getJWT from '../../../helpers/getJWT';
import * as React from 'react';

export default function withProtection(WrappedComponent: typeof React.Component) {

    return class WithProtection extends React.Component<{}, {admin: boolean}> {

        // displayName = `WithSaving(${WrappedComponent.displayName || WrappedComponent.name || 'Component'})`;
        constructor() {
            super();

            this.state = {
                admin: getJWT().admin
            };
        }

        componentDidMount() {

            addEventListener('storage', () => {
                this.setState({admin: getJWT().admin});
            });
        }

        render() {

            const addedProps = {
                admin: this.state.admin
            };

            return <WrappedComponent {...this.props} {...addedProps}/>
        }
    }
}