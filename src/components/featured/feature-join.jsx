import React, {PropTypes} from 'react';
import {Element} from 'react-scroll';
import reformed from 'react-reformed';
import compose from 'react-reformed/lib/compose';
import validateSchema from 'react-reformed/lib/validateSchema';
import FaFacebook from 'react-icons/fa/facebook';
import FaTwitter from 'react-icons/fa/twitter';
import Popover from '../popover/index.jsx';
import {Form, util, InputEmail, InputTextArea, InputText} from '../form/index.jsx';
import styles from './feature-join.scss';

const imageContext = require.context('../../images');

const fields = {
	name: {
		component: InputText,
		label: 'Name:',
		placeholder: 'First and last name',
		required: true,
		width: 'half'
	},
	email: {
		component: InputEmail,
		label: 'Email:',
		placeholder: 'Your email',
		required: true,
		width: 'half'
	},
	organisation: {
		component: InputText,
		label: 'Organisation:',
		placeholder: 'Your church or parachurch organisation',
		required: true
	},
	message: {
		component: InputTextArea,
		label: 'Message:',
		placeholder: 'Message',
		required: true
	}
};

const JoinForm = ({
	bindInput,
	model,
	onSubmit,
	schema
}) => {
	const handleSubmit = event => {
		event.preventDefault();
		onSubmit(model);
	};

	return (
		<div className={styles.form}>
			<Form onSubmit={handleSubmit} schema={schema} fields={fields} bindInput={bindInput}>
				<div className={`form-group ${styles.submit}`}>
					<button type="submit" className="btn btn-default form-control">Submit</button>
				</div>
			</Form>
		</div>
	);
};

JoinForm.propTypes = {
	bindInput: PropTypes.func,
	model: PropTypes.object,
	onSubmit: PropTypes.func,
	schema: PropTypes.object
};

const JoinFormContainer = compose(reformed(), validateSchema(fields), util.submitted)(JoinForm);

class FeaturedJoin extends React.Component {
	constructor() {
		super();
		this.state = {
			isModalOpen: false
		};
		this.setFormRef = this.setFormRef.bind(this);
		this.handleOpen = this.handleOpen.bind(this);
		this.handleClose = this.handleClose.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	set formRef(ref) {
		this._formRef = ref;
	}

	get formRef() {
		return this._formRef;
	}

	setFormRef(ref) {
		this.formRef = ref;
	}

	handleOpen() {
		this.setState({isModalOpen: true});
	}

	handleClose() {
		this.setState({isModalOpen: false});
		this.formRef.resetModel();
	}

	handleSubmit(model) {
		return fetch('https://qvikae2ufi.execute-api.us-west-2.amazonaws.com/prod/contact-us', {
			method: 'post',
			mode: 'cors',
			body: JSON.stringify({
				name: model.name,
				email: model.email,
				organisation: model.organisation,
				message: model.message
			}),
			headers: new Headers({
				'Content-Type': 'application/json'
			})
		}).catch(this.handleOpen).then(this.handleOpen);
	}
	render() {
		const {isModalOpen} = this.state;

		return (
			<div className={styles.feature}>
				<section className={styles.video}>
					<video autoPlay loop muted>
						<source src={imageContext('./clip2.mp4')} type="video/mp4"/>
					</video>
				</section>
				<section className={styles.content}>
					<Element name="join">
						<div className={styles.background}/>
						<header className="hidden">
							<h2>Sign up</h2>
						</header>

						<div className="text-slab">
							Begin the journey
						</div>

						<p className={styles.message}>
							Interested in coming on board? Get in touch below or via our Social Media channels.
						</p>
						<JoinFormContainer onSubmit={this.handleSubmit} getFormRef={this.setFormRef}/>
						<div className={styles.social}>
							<div>
								<a href="http://facebook.com/vision100it">
									<FaFacebook height="2em" width="2em"/>
								</a>
							</div>
							<div>
								<a href="http://twitter.com/vision100it">
									<FaTwitter height="2em" width="2em"/>
								</a>
							</div>
						</div>
					</Element>
				</section>
				{isModalOpen && <Popover onClose={this.handleClose}>
					<div className={styles.modal}>
						<h2>Thanks for contacting us!</h2>
						<p>We’ll be in touch soon to let you know the next steps.</p>
						<p><button className={styles.button} onClick={this.handleClose}>Awesome</button></p>
					</div>
				</Popover>}
			</div>
		);
	}
}

export default FeaturedJoin;
