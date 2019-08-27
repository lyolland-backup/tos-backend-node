class Api::V1::UserSerializer
    include FastJsonapi::ObjectSerializer
    attributes :username, :user_type, :id
end
  