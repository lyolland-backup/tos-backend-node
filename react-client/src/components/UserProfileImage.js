import React from "react";
import { Image } from "semantic-ui-react";

const UserProfileImage = ({ username }) => (
  <div className="profile-image-container">
    <Image
      src={`https://avatars.dicebear.com/v2/jdenticon/${username}.svg`}
      size="small"
      circular
      centered
    />
    <span role="img" aria-label="researcher tag">👩‍🔬</span>
  </div>
);

export default UserProfileImage;
