// import React, { Component } from "react";

// class UserBioEditForm extends Component {
//   // constructor(props) {
//   //   super(props);
//   //   const { bio } = props;
//     this.state = {
//       bio: bio,
//     };
//   // }

//   editBio = e => {
//     this.setState({
//       [e.target.name]: e.target.value
//     });
//   };

//   handleSubmit = e => {
//     e.preventDefault();
//     this.props.updateBio(this.state);
//   };
  
//   render() {
//     return (
//       <form onSubmit={this.handleSubmit}>
//         <textarea
//           name="bio"
//           onChange={this.editBio}
//           value={this.props.bio}
//         />
//         <button className="button" type="submit" value="save">save</button>
//       </form>
//     );
//   }
// }

// export default UserBioEditForm;
