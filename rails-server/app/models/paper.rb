class Paper < ApplicationRecord

    has_many :user_paper
    has_many :users, through: :user_paper


end
