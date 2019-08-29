class Api::V1::UserSerializer
    include FastJsonapi::ObjectSerializer
    attributes :id, :username, :usertype, :bio

    # has_many :papers
    attributes :papers do |object|
        object.papers.as_json
    end

end

# rails generate migration add_fieldname_to_tablename fieldname:string

# rails generate migration AddBioToUser bio:string
  