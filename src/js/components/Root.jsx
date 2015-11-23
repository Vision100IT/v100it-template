import React from 'react';
import '../../css/main';
import {Header} from './Header';
import {Footer} from './Footer';

export class Root extends React.Component {
		render() {
			return (<html>
						<head>
								<title>{this.props.title}</title>
								<link rel="stylesheet" type="text/css" href="main.css"></link>
								<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.4.0/css/font-awesome.min.css"></link>
						</head>
						<body>
<Header></Header>
								{this.props.children}
								<Footer></Footer>
								<script src="http://localhost:3000/webpack-dev-server.js"></script>
								<script src="index.js"></script>
						</body>
				</html>);
		}
}
