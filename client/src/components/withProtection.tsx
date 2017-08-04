import getJWT from '../helpers/getJWT';
import * as React from 'react';

// if don't do this, errors. Basically all props that any component using this can have
interface PropsOfChildComponents {
    onDelete?: Function;
    postId?: string;
    comments?: Array<{
        content: string;
        created: Date;
        id: string;
        author: {
            firstName: string;
            lastName: string;
        };
    }>;
    email?: string;
}

export default function withProtection(WrappedComponent: typeof React.Component) {


    return class WithProtection extends React.Component<PropsOfChildComponents, any> {

        displayName = `WithSaving(${WrappedComponent.name || 'Component'})`;

        constructor() {
            super();

            const jwt = getJWT();

            this.state = {
                admin: jwt.admin,
                email: jwt.email
            };
        }

        componentDidMount() {


            addEventListener('storage', () => {
                const jwt = getJWT();

                this.setState({
                    admin: jwt.admin,
                    email: jwt.email
                });
            });
        }

        render() {

            const addedProps = {
                admin: this.state.admin,
                email: this.state.email
            };

            return <WrappedComponent {...this.props} {...addedProps}/>;
        }
    };
}