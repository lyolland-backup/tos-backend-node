// import React, { Component, Fragment } from "react";
// import { Icon } from "semantic-ui-react";

// class UserBioEditForm extends Component {
//   constructor(props) {
//     super(props);
//     const { bio } = props;
//     this.state = {
//       bio: bio,
//       editBioToggle: false
//     };
//   }

//   editBio = e => {
//     this.setState({
//       [e.target.name]: e.target.value
//     });
//   };

//   handleSubmit = e => {
//     e.preventDefault();
//     this.props.updateBio(this.state);
//         this.setState({
//       editBioToggle: !this.state.editBioToggle
//     });
//     this.props.setUserData()
//   };

//   handleBioChange = () => {
//     console.log("edit the bio now ✅🖋");
//     this.setState({
//       editBioToggle: !this.state.editBioToggle
//     });

//   };

//   render() {
//    const view = this.state.editBioToggle ? 
//         <Fragment>
//           <Icon name="close" onClick={this.handleBioChange} />
//           <form onSubmit={this.handleSubmit} className="bio-edit">
//             <textarea
//               name="bio"
//               onChange={this.editBio}
//               value={this.state.bio}
//               className="bio-input"
//             />
//             <button className="button" type="submit" value="save">
//               save
//             </button>
//           </form>
//         </Fragment>
//      :<Icon name="edit outline" onClick={this.handleBioChange} />
      
//     return <div>{view}</div>
//   }
// }

// export default UserBioEditForm;
