class Api::V1::PapersController < ApplicationController

    def index
        @papers = Paper.all
        render(  json: Api::V1::PaperSerializer.new(@papers)  )
    end

    def show
        @paper = Paper.find(params[:id])
        render( json: Api::V1::PaperSerializer.new(@paper) )
    end

    def create
        @paper = Paper.create(paper_params)
        render( json: Api::V1::PaperSerializer.new(@paper) )
    end

    def update
        @paper = Paper.find(params[:id])
        @paper.update(paper_params)
        render(  json: { paper: Api::V1::PaperSerializer.new(@paper)  })
    end

    private
    def paper_params
        params.require(:paper).permit(:id, :title, :abstract, :category, :doi, :rating, :user_id)
    end

end
