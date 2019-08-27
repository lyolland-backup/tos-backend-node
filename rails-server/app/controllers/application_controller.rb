class ApplicationController < ActionController::API
    before_action :set_current_user

  def get_token
    request.headers["Authorization"] || request.headers["Authorisation"]
  end

  def encode_token(payload)
    #   use => ENV['RAILS_SECRET'])
      JWT.encode(payload, 'my_s3cr3t')
  end

  def decode_token(token)
    #   use => ENV['RAILS_SECRET'])
    JWT.decode(get_token, 'my_s3cr3t')
  end

  def set_current_user
      token = get_token
      if token
          decoded_token = decode_token(token)
          @current_user = User.find(decoded_token[0]["user_id"].to_i)
      else 
          @current_user = nil
      end
  end

  def logged_in
      !!@current_user
  end
end
