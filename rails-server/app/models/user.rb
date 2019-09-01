class User < ApplicationRecord

  has_many :reviews
  has_many :papers

  validates :username, uniqueness: true
  validates :password, presence: true, on: :create
  #  allow_nil: true
  # removing password validation allows to update user attributes
  #  changing to pword digest works ...?
  has_secure_password

end
