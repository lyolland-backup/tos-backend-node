class Api::V1::ReviewsController < ApplicationController

    def index
        @reviews = Paper.all
        render(  json: Api::V1::ReviewSerializer.new(@reviews)  )    
    end

    def show
        @review = Review.find(params[:id])
        render( json: Api::V1::ReviewSerializer.new(@review) )
    end

    def create
        @review = Review.create(review_params)
        render( json: Api::V1::ReviewSerializer.new(@review) )
    end

    private
    def review_params
        params.require(:review).permit(:id, :content, :user_id, :paper_id)
    end
    
end
