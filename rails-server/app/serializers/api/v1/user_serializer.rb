class Api::V1::UserSerializer 
    include FastJsonapi::ObjectSerializer
    attributes :id, :username, :usertype, :bio

    attributes :papers do |object|
        object.papers.as_json
    end
    # has_many :papers

end
