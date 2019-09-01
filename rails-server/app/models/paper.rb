class Paper < ApplicationRecord

    # has_many :user_paper
    # has_many :users, through: :user_paper

    belongs_to :user
    has_many :reviews

end
