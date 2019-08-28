import React from "react";
import { Image } from "semantic-ui-react";

const UserProfileImage = ({ username }) => (
  <Image
    src={`https://avatars.dicebear.com/v2/jdenticon/${username}.svg`}
    size="small"
    circular
    centered
  />
);

export default UserProfileImage;
