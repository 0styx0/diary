import * as React from 'react';

import './index.css';

interface Props {
  heading: string;
  children?: Element[] | JSX.Element[] | JSX.Element;
  className?: string;
}

export default function Container(props: Props) {

        const className = `container ${props.className || ''}`;

        return (
            <section className={className}>
                <h1>{props.heading}</h1>
                {props.children}
            </section>
        );
}