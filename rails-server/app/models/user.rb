class User < ApplicationRecord

  has_many :user_paper
  has_many :papers, through: :user_paper
  has_many :review

  validates :username, uniqueness: true
  validates :password, presence: true, on: :create
  #  allow_nil: true

  # removing password validation allows to update user attributes
  #  changing to pword digest works ...?
  has_secure_password

end
