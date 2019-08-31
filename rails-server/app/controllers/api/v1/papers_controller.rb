class Api::V1::PapersController < ApplicationController

    def index
        @papers = Paper.all
        render(  json: Api::V1::PaperSerializer.new(@papers)  )
        # @papers = Paper.all
        # render json: @papers, each_serializer: Api::V1::PaperSerializer

    end

    def show
        @paper = Paper.find(params[:id])
        # render json:  @paper, each_serializer: Api::V1::PaperSerializer

        render( json: Api::V1::PaperSerializer.new(@paper) )
    end

    def create
        # binding.pry
        @paper = Paper.create(paper_params)
        render( json: Api::V1::PaperSerializer.new(@paper) )
        # render json: @paper, each_serializer: Api::V1::PaperSerializer
    end

    private
    def paper_params
        params.require(:paper).permit(:id, :title, :abstract, :category, :doi, :user_id)
    end

end
