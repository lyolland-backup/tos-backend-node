class Api::V1::PaperSerializer 
    include FastJsonapi::ObjectSerializer
    attributes :id, :title, :abstract, :category, :doi, :user, :reviews
end
