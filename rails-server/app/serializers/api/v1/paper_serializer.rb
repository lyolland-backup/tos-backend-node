class Api::V1::PaperSerializer
    include FastJsonapi::ObjectSerializer
    attributes :id, :title, :abstract, :users

    # has_many :user, serializer: Api::V1::UserSerializer // check why has many isnt require!!
end
  

# rails g resource User username usertype:boolean password:digest

# rails g resource Paper title abstract

# rails g resource UserPaper user:references paper:references

# rails g resource Review content user:references paper:references