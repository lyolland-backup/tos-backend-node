class Api::V1::ReviewSerializer 
    include FastJsonapi::ObjectSerializer
    attributes :id, :content, :user_id, :paper_id
end
