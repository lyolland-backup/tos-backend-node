class Api::V1::UsersController < ApplicationController
    skip_before_action :set_current_user, only: [:create]

    def index 
        render( { json: Api::V1::UserSerializer.new(User.all) } )
    end

    def create
        @user = User.create(user_params)
        if @user.valid?
            @token = encode_token({ user_id: @user.id })
            render json: { user: Api::V1::UserSerializer.new(@user), jwt: @token }, status: :created
        else
            render json: { error: 'failed to create user 🤦‍' }, status: :not_acceptable
        end
    end

    def profile
        user = User.find(params[:id])
        render( { json: Api::V1::UserSerializer.new(user) } )
    end

    private    
    def user_params
        params.require(:user).permit(:username, :password, :id, :user_type)
    end

end
